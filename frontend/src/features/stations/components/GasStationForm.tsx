import { useState, FormEventHandler, ChangeEvent, useEffect } from "react";

import { toast } from "react-toastify";

import { isEqual } from 'lodash';

import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import { useModals } from "features/modal";
import { toInt } from "utils";
import { GasStation, GasStationTerminal, NewGasStationTerminal } from "features/stations/types";
import GasStationTerminalsForm from "features/stations/components/GasStationTerminalsForm";
import LoadingButton from 'features/misc/components/LoadingButton';

export type GasStationFormProps = {
  initialData: {
    gasStation: Partial<GasStation>;
    terminals: GasStationTerminal[];
  };
  onSubmit: (value: {
    gasStation: GasStation;
    terminals: GasStationTerminal[];
  }) => void;
  isLoading?: boolean;
};

export default function GasStationForm(props: GasStationFormProps) {
  const { initialData, onSubmit, isLoading } = props;
  const [openModal] = useModals();
  const [gasStationState, setGasStationState] = useState(
    initialData.gasStation
  );
  const [terminalsState, setTerminalsState] = useState(initialData.terminals);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    openModal({
      title: "Завершить редактирование?",
      content: "Данные будут сохранены на сервере",
      actions: {
        Сохранить: () =>
          onSubmit({
            gasStation: gasStationState as GasStation,
            terminals: terminalsState,
          }),
      },
    });
  };

  const handleDeleteTerminal = (terminalId: GasStationTerminal["id"]) =>
    openModal({
      title: "Удалить терминал?",
      actions: {
        Удалить: () =>
          setTerminalsState((prevState) =>
            prevState.filter((terminal) => terminal.id !== terminalId)
          ),
      },
    });

  const handleResetAll = () =>
    openModal({
      title: "Восстановить все значения?",
      actions: {
        Востановить: () => {
          setGasStationState(initialData.gasStation);
          setTerminalsState(initialData.terminals);
        },
      },
    });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setGasStationState((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.type === "number" ? toInt(e.target.value) : e.target.value,
    }));

  const handleAddTerminal = () => {
    setTerminalsState((prevState) => [
      ...prevState,
      {
        id: prevState.reduce((acc, curr) => Math.max(acc, curr.id), 0) + 1,
        gasStationId: initialData.gasStation.id,
        name: "",
        code: "",
        description: "",
        isNew: true,
      } as GasStationTerminal | NewGasStationTerminal,
    ]);
  };

  const handleResetTerminal = (terminalId: GasStationTerminal["id"]) =>
    openModal({
      title: "Восстановить значения?",
      actions: {
        Восстановить: () =>
          setTerminalsState((prevState) =>
            prevState.map((terminal) => {
              if (terminal.id !== terminalId) return terminal;

              const foundTerminal = initialData.terminals.find(
                (terminal) => terminal.id === terminalId
              ) ?? {
                  id: prevState.reduce((acc, curr) => Math.max(acc, curr.id), 0),
                  gasStationId: initialData.gasStation.id,
                  name: "",
                  code: "",
                  description: "",
              } as GasStationTerminal;

              return foundTerminal ?? terminal;
            })
          ),
      },
    });

  const handleChangeTerminal = (e: ChangeEvent<HTMLInputElement>) => {
    const info = e.target.name.split(".");
    const terminalId = parseInt(info[0]);
    const fieldName = info[1];

    setTerminalsState((prevState) =>
      prevState.map((terminal) =>
        terminal.id === terminalId
          ? { ...terminal, [fieldName]: e.target.value }
          : terminal
      )
    );
  };

  const isChanged = !isEqual(initialData.gasStation, gasStationState) || !isEqual(initialData.terminals, terminalsState);

  useEffect(() => {
    setTerminalsState(initialData.terminals);
  }, [initialData.terminals]);

  useEffect(() => {
    setGasStationState(initialData.gasStation);
  }, [initialData.gasStation]);

  return (
    <form onSubmit={handleSubmit}>
      <Box paddingX={1.5} paddingY={2} component={Paper} width="100%">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Имя"
              fullWidth
              variant="outlined"
              name="name"
              value={gasStationState.name}
              onChange={onChange}
              required
            />
          </Grid>
        </Grid>
      </Box>
      <Box marginY={1}>
        <GasStationTerminalsForm
          terminals={terminalsState}
          onChange={handleChangeTerminal}
          onAdd={handleAddTerminal}
          onDelete={handleDeleteTerminal}
          onReset={handleResetTerminal}
        />
      </Box>
      <Divider />
      <Box
        paddingX={1.5}
        paddingY={2}
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1">Завершить редактирование</Typography>
        <div>
          <Button
            color="primary"
            onClick={handleResetAll}
            style={{ marginRight: 8 }}
            disabled={isLoading || !isChanged}
          >
            Восстановить
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={isLoading}
            disabled={!isChanged}
          >
            Сохранить
          </LoadingButton>
        </div>
      </Box>
    </form>
  );
}

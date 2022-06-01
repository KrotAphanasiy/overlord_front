import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Copy, Headline, NotFound } from "features/misc";
import { ChangeEvent } from "react";
import { GasStationTerminal } from "../types";

type GasStationTerminalsFormProps = {
  terminals: GasStationTerminal[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: (terminalId: GasStationTerminal["id"]) => void;
  onReset: (terminalId: GasStationTerminal["id"]) => void;
  onAdd: () => void;
};

export default function gasStationTerminalsForm(
  props: GasStationTerminalsFormProps
) {
  const { terminals, onChange, onDelete, onReset, onAdd } = props;
  return (
    <>
      <Headline level="2" text="Терминалы" />
      {terminals.length > 0 ? (
        terminals.map((terminal) => (
          <Box
            key={terminal.id}
            component={Paper}
            paddingX={1.5}
            paddingY={2}
            marginBottom={1.5}
            width="100%"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="overline">
                  <Copy text={terminal.id.toString()} />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Имя"
                  fullWidth
                  variant="outlined"
                  name={`${terminal.id}.name`}
                  value={terminal.name}
                  onChange={onChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Код"
                  fullWidth
                  variant="outlined"
                  name={`${terminal.id}.code`}
                  value={terminal.code ?? ""}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Описание"
                  fullWidth
                  variant="outlined"
                  name={`${terminal.id}.description`}
                  value={terminal.description ?? ""}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  height="100%"
                >
                  <Button color="primary" onClick={() => onReset(terminal.id)}>
                    Восстановить
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => onDelete(terminal.id)}
                  >
                    Удалить
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))
      ) : (
        <NotFound text="Список терминалов пуст" />
      )}
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        paddingBottom={2}
      >
        <Button variant="text" color="primary" onClick={onAdd}>
          Добавить терминал
        </Button>
      </Box>
    </>
  );
}

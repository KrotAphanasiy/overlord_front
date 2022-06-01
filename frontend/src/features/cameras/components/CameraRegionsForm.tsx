import {FC, ChangeEvent, useCallback, useMemo, useState, useEffect} from 'react';

import {find, filter, forEach} from 'lodash';

import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import { Copy, Headline, Select } from "features/misc";

import { SelectProps } from 'features/misc/components/Select';
import { Camera, CameraEdit } from "features/cameras";
import { Region, NewRegion } from 'features/cameras/types';
import {GasStationTerminal} from "../../stations";
import {getTerminal} from "../api";
import {getTerminals} from "../../stations/api";

interface CameraRegionsFormProps {
  camera: Camera | Partial<CameraEdit>;
  initialCamera: Camera | Partial<CameraEdit>;
  availableTerminalIds: number[];
  onChange: (e: ChangeEvent<any>) => void;
  onDeleteRegion: (regionId: number) => void;
  onResetRegion: (regionId: number) => void;
  onAddRegion: () => void;
}

interface Name {
  id: number
  name: string
}

const CameraRegionsForm: FC<CameraRegionsFormProps> = ({
  camera,
  initialCamera,
  onChange,
  onDeleteRegion,
  onResetRegion,
  onAddRegion,
  availableTerminalIds,
}) => {
  const [terminalNames, setTerminalNames] = useState<Name[]>([]);

  useEffect(() => {
    (async () => {

      camera.regions?.forEach( async (region) => {
        const terminal = await getTerminal(region.terminalId)
        const name = terminal.data.name

        if (terminalNames?.find(e => e.id === region.terminalId) === undefined)
        {
          const newId = terminal.data.id;
          const newName = terminal.data.name;
          const element = {
            id: newId,
            name: newName
          }

          setTerminalNames(prevState => [...prevState, element])
        }
      })

      availableTerminalIds.forEach( async (terminalId) => {
        const terminal = await getTerminal(terminalId)
        const name = terminal.data.name

        if (terminalNames?.find(e => e.id === terminalId) === undefined)
        {
          const newId = terminal.data.id;
          const newName = terminal.data.name;
          const element = {
            id: newId,
            name: newName
          }

          setTerminalNames(prevState => [...prevState, element])
        }
      })

    })();

  }, [availableTerminalIds, initialCamera, camera])


  const availableTerminalsOptions = useMemo<SelectProps['options']>(() => {
    const initialAvailableTerminals = availableTerminalIds.map(id => ({
      label: terminalNames.find(name => name.id === id)?.name ?? id, value: id
    }));

    const initialUnavailableTerminals = filter(initialCamera.regions?.map(({ terminalId }) => ({
      label: terminalNames.find(name => name.id === terminalId)?.name, value: terminalId,
    })) ?? [], 'value') as SelectProps['options'];

    const allTerminals: SelectProps['options'] = [
      ...initialAvailableTerminals,
      ...initialUnavailableTerminals,
    ];

    const availableTerminals = allTerminals.filter(({ value }) => {
      const terminalIsTaken = Boolean(find(camera.regions, ['terminalId', value]));

      return !terminalIsTaken;
    }); 

    return availableTerminals;
  }, [availableTerminalIds, camera, initialCamera]);

  const getAvailableTerminals = useCallback<(region: Region | NewRegion) => SelectProps['options']>(region => {
    const initialRegion = initialCamera.regions?.find(({ id }) => region.id === id);

    const isEditing = camera.id !== undefined;

    if (isEditing && initialRegion && region.terminalId) {
      return [
        ...availableTerminalsOptions,
        {
          label: terminalNames.find(name => name.id === region.terminalId)?.name ?? region.terminalId,
          value: Number(region.terminalId),
        }
      ];
    }

    return availableTerminalsOptions;
  }, [availableTerminalsOptions, camera.id, initialCamera.regions]);


  return (
    <>
      <Headline level="2" text="Регионы" />
      {camera.regions?.map((region) => (
        <Box
          key={region.id}
          component={Paper}
          paddingX={1.5}
          paddingY={2}
          marginBottom={1.5}
          width="100%"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="overline">
                <Copy text={region.id.toString()} />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                  label="Name"
                  fullWidth
                  variant="outlined"
                  name={`${region.id}.regionName`}
                  value={region.regionName}
                  onChange={onChange}
                  required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="topLeftX"
                fullWidth
                variant="outlined"
                name={`${region.id}.topLeftX`}
                value={region.topLeftX}
                onChange={onChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="topLeftY"
                fullWidth
                variant="outlined"
                name={`${region.id}.topLeftY`}
                value={region.topLeftY}
                onChange={onChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="bottomRightX"
                fullWidth
                variant="outlined"
                name={`${region.id}.bottomRightX`}
                value={region.bottomRightX}
                onChange={onChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="bottomRightY"
                fullWidth
                variant="outlined"
                name={`${region.id}.bottomRightY`}
                value={region.bottomRightY}
                onChange={onChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Select
                label="terminalId"
                fullWidth
                variant="outlined"
                name={`${region.id}.terminalId`}
                value={/*region.terminalId*/ terminalNames?.find(name => name.id === region.terminalId)?.name ?? region.terminalId}
                onChange={onChange}
                type="number"

                options={getAvailableTerminals(region)}
                required
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
            >
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                height="100%"
              >
                <Button
                  color="primary"
                  onClick={() => onResetRegion(region.id)}
                >
                  Восстановить
                </Button>
                <Button
                  color="secondary"
                  onClick={() => onDeleteRegion(region.id)}
                >
                  Удалить
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
      {camera.regions?.length === 0 && (
        <Box paddingTop={2}>
          <Typography variant="subtitle1">Список регионов пуст</Typography>
        </Box>
      )}
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        paddingY={2}
      >
        {availableTerminalsOptions.length === 0 ? (
          <Typography variant="subtitle1">
            Создание нового региона невозможно, так как все терминалы выбранной
            станции уже привязаны к регионам
          </Typography>
        ) : (
          <Button variant="text" color="primary" onClick={onAddRegion}>
            Добавить регион
          </Button>
        )}
      </Box>
    </>
  );
}

export default CameraRegionsForm;

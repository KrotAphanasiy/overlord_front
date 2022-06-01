import { FC, Fragment, useState, useEffect, useCallback } from 'react';

import { Redirect, useParams } from "react-router-dom";

import { isEqual, compact } from 'lodash';
import { toast } from "react-toastify";

import GasStationForm from "features/stations/components/GasStationForm";
import { Layout } from "features/layout";
import { Headline } from "features/misc";

import {
  createTerminal,
  deleteTerminal,
  updateGasStation,
  updateTerminal,
} from "features/stations/api";
import http from 'lib/http';

import { GasStation, GasStationTerminal } from "features/stations/types";
import { CommonResponse } from 'types';
import { CircularProgress } from '@material-ui/core';

interface StationInitialData {
  gasStation: GasStation;
  terminals: GasStationTerminal[];
}

type HandleSubmit = (value: StationInitialData) => void;

const EditStationPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [initialData, setInitialData] = useState<StationInitialData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditLoading, setIsEditLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const { data: { data: gasStation } } = await http.get<CommonResponse<GasStation>>(`GasStation/${id}`);
    const { data: { data: terminals } } = await http.get(`Terminal?gasStationId=${id}`);

    setInitialData({ gasStation, terminals });
    setIsLoading(false);
  }, [id]);

  const handleSubmit: HandleSubmit =  useCallback(async ({ gasStation, terminals }) => {
    if (!initialData) return;

    const terminalsToCreate = terminals.filter(terminal => !initialData.terminals.some(({ id }) => id === terminal.id));
    const terminalsToDelete = initialData.terminals.filter(terminal => !terminals.some(({ id }) => id === terminal.id));
    const terminalsToUpdate = terminals.filter(terminal => {
      if ('isNew' in terminal) return false;

      const terminalToCompare = initialData.terminals.find(({ id }) => id === terminal.id);

      return !isEqual(terminal, terminalToCompare);
    });

    const gasStationChanged = !isEqual(initialData.gasStation, gasStation);
    const terminalsDeleted = terminalsToDelete.length;
    const terminalsCreated = terminalsToCreate.length;
    const terminalsChanged = terminalsToUpdate.length;

    setIsEditLoading(true);

    const requests = compact([
      gasStationChanged && updateGasStation(gasStation)
        .then(() => toast.success("Станция успешно обновлена"))
        .catch(() => toast.error("Не удалось обновить станцию")),
      terminalsChanged && Promise.all(terminalsToUpdate.map((terminal) => updateTerminal(terminal)))
        .then(() => toast.success("Терминалы успешно обновлены"))
        .catch(() => toast.error("Не удалось обновить терминалы")),
      terminalsCreated && Promise.all(terminalsToCreate.map((terminal) => createTerminal(terminal)))
        .then(() => toast.success("Терминалы успешно созданы"))
        .catch(() => toast.error("Не удалось создать терминалы")),
      terminalsDeleted && Promise.all(terminalsToDelete.map((terminal) => deleteTerminal(terminal)))
        .then(() => toast.success("Терминалы успешно удалены"))
        .catch(() => toast.error("Не удалось удалить терминалы")),
    ]);

    await Promise.all(requests);

    setIsEditLoading(false);

    fetchData();
  }, [fetchData, initialData])

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  return (
    <Layout title={`Редактировать станцию ${id}`}>
      <Headline level="1" text="Редактировать станцию" />
      {isLoading ? <CircularProgress /> : (
        <Fragment>
          {!initialData?.gasStation || !initialData?.terminals ? (
            <Redirect to="/stations" />
          ) : (
            <GasStationForm
              initialData={initialData}
              onSubmit={handleSubmit}
              isLoading={isEditLoading}
            />
          )}
        </Fragment>
      )}
    </Layout>
  );
};

export default EditStationPage;

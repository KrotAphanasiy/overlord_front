import { useState, useCallback } from 'react';

import { toast } from "react-toastify";

import { Layout } from "features/layout";
import { Headline } from "features/misc";
import { useHistory } from "react-router";
import { createGasStation, createTerminal } from "../api";
import GasStationForm from "../components/GasStationForm";
import { GasStation, GasStationTerminal } from "../types";

interface HandleSubmitParams {
  gasStation: GasStation;
  terminals: GasStationTerminal[];
}

type HandleSubmit = (params: HandleSubmitParams) => Promise<void>;

export default function CreateStationPage() {
  const { push } = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback<HandleSubmit>(async ({ gasStation, terminals }) => {
    setIsLoading(true);

    try {
      const { data: { data: { id } } } = await createGasStation(gasStation);

      const promises = terminals.map(terminal => {
        return createTerminal({
          ...terminal,
          gasStationId: id,
        });
      });

      toast.success('Станция успешно создана');
  
      try {
        await Promise.all(promises);
        if (terminals.length) {
          toast.success('Терминалы успешно созданы')
        };
      } catch (err) {
        toast.error('Не удалось создать терминалы');
        console.error(err);
      }

      push(`/stations/${id}`);
    } catch (err) {
      toast.error('Не удалось создать станцию');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [push]);

  return (
    <Layout title="Создать станцию">
      <Headline level="1" text="Создать станцию" />
      <GasStationForm
        initialData={{
          gasStation: {
            name: "",
            gasPumpCount: 0,
          },
          terminals: [],
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Layout>
  );
}

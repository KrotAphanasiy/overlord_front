import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { Box, Button } from "@material-ui/core";

import { useModals } from "features/modal";
import { GasStation } from "features/stations/types";
import { deleteGasStation } from "features/stations/api";
import {getCameras, getCamerasForGasStation} from "../../cameras/api";

type CurrentStationPageActionsProps = {
  station: GasStation;
  hasTerminals: boolean;
};

export default function CurrentStationPageActions({
  station, hasTerminals,
}: CurrentStationPageActionsProps) {
  const [openModal] = useModals();

  const { push } = useHistory();

  const hasCameras = async () => {
      let res = false;

      const cameras = (await getCamerasForGasStation(station.id)).data
      if (cameras.length !== 0) res = true

      return res
  }

  const handleDelete = () =>
    openModal({
      title: "Удалить станцию",
      content: "Внимание! Это действие нельзя отменить",
      actions: {
        Удалить: () => {
            let hasCams = false
            deleteGasStation(station)
                .catch(() => toast.error("Не удалось удалить станцию"))
                .then(async () => {
                    hasCams = await hasCameras()

                    if (hasCams) {
                        toast.error("Невозможно удалить станцию с детекторами")
                    }
                    else if (hasTerminals){
                        toast.error("Невозможно удалить станцию с терминалами")
                    }
                    else if (!hasCams && !hasTerminals) {
                        toast.success("Станция успешно удалена")
                    }
                })
                .then(() => !hasTerminals && !hasCams && push("/stations"))
            push("/stations")
        }
      },
    });

  return (
    <Box paddingY={1}>
      <Button variant="outlined" onClick={() => {
          handleDelete()
      }}>
        Удалить
      </Button>
    </Box>
  );
}

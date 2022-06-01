import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { Box, Button, Tooltip } from "@material-ui/core";

import { Camera } from "features/cameras";
import { useModals } from "features/modal";
import { deleteCamera } from "features/cameras/api";

type CurrentCameraPageActionsProps = {
  camera: Camera;
};

export default function CurrentCameraPageActions({
  camera,
}: CurrentCameraPageActionsProps) {
  const [openModal] = useModals();

  const { push } = useHistory();

  const handleDelete = () =>
    openModal({
      title: "Удалить детектор",
      content: "Внимание! Это действие нельзя отменить",
      actions: {
        Удалить: () =>
          deleteCamera(camera)
            .then(() => 
              camera.regions.length 
                ? toast.error("Невозможно удалить детектор с регионами")
                : toast.success("Детектор успешно удален")
              )
            .then(() => !camera.regions.length && push("/cameras"))
            .catch(() => toast.error("Не удалось удалить камеру")),
      },
    });

  const isDeletable = camera.regions.length === 0;

  return (
    <Box paddingY={1}>
      <Tooltip title="Невозможно удалить детектор с регионами" placement='top' disableHoverListener={isDeletable}>
        <Box width='fit-content'>
          <Button variant="outlined" color='secondary' disabled={!isDeletable} onClick={handleDelete}>
            Удалить
          </Button>
        </Box>
      </Tooltip>
    </Box>
  );
}

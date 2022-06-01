import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { ModalState } from "../types";

type CommonModalProps = ModalState & {
  onClose: () => void;
  actions?: Record<string, () => void>;
};

export default function CommonModal(props: CommonModalProps) {
  const {
    open,
    onClose,
    options: { actions, title, content },
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      disablePortal
      fullWidth
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
      {content && <DialogContent dividers>{content}</DialogContent>}
      <DialogActions>
        {actions &&
          Object.entries(actions).map(([text, action]) => (
            <Button
              onClick={() => {
                action();
                onClose();
              }}
              color="primary"
              key={text}
            >
              {text}
            </Button>
          ))}
        <Button onClick={onClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}

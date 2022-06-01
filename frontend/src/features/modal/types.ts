import { ReactNode } from "react";

export type ModalOptions = {
  title: string;
  content?: ReactNode;
  actions?: Record<string, () => void>;
};

export type ModalState = {
  open: boolean;
  options: ModalOptions;
};

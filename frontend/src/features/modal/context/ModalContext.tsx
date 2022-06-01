import { createContext, ReactNode, useState } from "react";
import { useContext } from "react";
import CommonModal from "../components/CommonModal";
import { ModalOptions, ModalState } from "../types";

const initialModalState: ModalState = {
  options: { title: "", content: undefined, actions: undefined },
  open: false,
};

type ModalContextValue = [(options: ModalOptions) => void, () => void];

const modalContext = createContext<ModalContextValue>([() => {}, () => {}]);

type ModalProviderProps = {
  children: ReactNode;
};

export default function ModalsProvider({ children }: ModalProviderProps) {
  const [modalState, setModalState] = useState<ModalState>(initialModalState);

  const openModal: ModalContextValue[0] = (options) =>
    setModalState({ options, open: true });
  const closeModal: ModalContextValue[1] = () =>
    setModalState((prevState) => ({ ...prevState, open: false }));

  return (
    <modalContext.Provider value={[openModal, closeModal]}>
      {children}
      <CommonModal {...modalState} onClose={closeModal} />
    </modalContext.Provider>
  );
}

export const useModals = () => useContext(modalContext);

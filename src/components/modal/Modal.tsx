import type { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import ModalBox from './modalBox/ModalBox.tsx';

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ isModalOpen, setIsModalOpen }: ModalProps) => {
  const modalRoot = document.getElementById('modal-root')!;
  return createPortal(
    <ModalBox isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />,
    modalRoot,
  );
};

export default Modal;

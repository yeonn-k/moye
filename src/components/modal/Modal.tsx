import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModalBox from './modalBox/ModalBox.tsx';
import { RootState } from '../../store/store.ts';
import ConfirmModal from './modalBody/ConfirmModal/ConfirmModal.tsx';
import { closeModal } from '../../store/slices/modal/modalSlice.ts';
import SearchModal from './modalBody/searchModal/SearchModal.tsx';

const Modal = () => {
  const modalRoot = document.getElementById('modal-root')!;
  const { modalType } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const handleModalCloseButtonClick = () => {
    dispatch(closeModal());
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'confirm':
        return <ConfirmModal onClose={handleModalCloseButtonClick} />;
      case 'search':
        return <SearchModal onClose={handleModalCloseButtonClick} />;
      default:
        return null;
    }
  };

  return createPortal(
    <>{modalType && <ModalBox>{renderModalContent()}</ModalBox>}</>,
    modalRoot,
  );
};

export default Modal;

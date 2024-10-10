import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModalBox from './modalBox/ModalBox.tsx';
import { RootState } from '../../store/store.ts';
import ConfirmModal from './modalBody/ConfirmModal/ConfirmModal.tsx';
import { closeModal } from '../../store/slices/modal/modalSlice.ts';

const Modal = () => {
  const modalRoot = document.getElementById('modal-root')!;
  const { isConfirmModalOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const handleModalCloseButtonClick = () => {
    dispatch(closeModal());
  };

  return createPortal(
    <>
      {/* ModalBody: 모달 열림 상태 별 조건 부 렌더링 */}
      {isConfirmModalOpen && (
        <ModalBox>
          <ConfirmModal onClose={handleModalCloseButtonClick} />
        </ModalBox>
      )}
    </>,
    modalRoot,
  );
};

export default Modal;

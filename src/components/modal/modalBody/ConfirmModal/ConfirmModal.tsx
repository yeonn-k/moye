import { S } from './ConfirmModal.style';

interface ConfirmModalProps {
  onClose: () => void;
}

const ConfirmModal = ({ onClose }: ConfirmModalProps) => {
  return (
    <S.ModalBox>
      <S.ModalCloseButton onClick={onClose}>&times;</S.ModalCloseButton>

      <S.ModalText>확인하시겠습니까?</S.ModalText>

      <S.ModalButtonGroup>
        <S.ModalConfirmButton action="confirm" />
        <S.ModalCancelButton action="cancel" />
      </S.ModalButtonGroup>
    </S.ModalBox>
  );
};

export default ConfirmModal;

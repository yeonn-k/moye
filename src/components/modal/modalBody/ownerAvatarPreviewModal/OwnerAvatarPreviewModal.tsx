import { S } from './OwnerAvatarPreviewModal.style';

interface OwnerAvatarPreviewModalProps {
  onClose: () => void;
}

const OwnerAvatarPreviewModal = ({ onClose }: OwnerAvatarPreviewModalProps) => {
  return (
    <S.ModalBox>
      <S.ModalCloseButton onClick={onClose}>&times;</S.ModalCloseButton>

      <S.ModalText>아바타 이미지 미리보기 모달</S.ModalText>

      <S.ModalButtonGroup>
        <S.ModalConfirmButton action="confirm" />
        <S.ModalCancelButton action="cancel" onClick={onClose} />
      </S.ModalButtonGroup>
    </S.ModalBox>
  );
};

export default OwnerAvatarPreviewModal;

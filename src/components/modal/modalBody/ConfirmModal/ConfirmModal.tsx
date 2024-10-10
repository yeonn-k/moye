import React from 'react';
import { S } from './ConfirmModal';

const ConfirmModal = () => {
  return (
    <S.ModalBox>
      <S.ModalCloseButton>&times;</S.ModalCloseButton>

      <S.ModalText>확인하시겠습니까?</S.ModalText>

      <S.ModalButtonGroup>
        <S.ModalConfirmButton action="confirm" />
        <S.ModalCancelButton action="cancel" />
      </S.ModalButtonGroup>
    </S.ModalBox>
  );
};

export default ConfirmModal;

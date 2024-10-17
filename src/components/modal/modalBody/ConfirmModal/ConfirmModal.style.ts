import styled from 'styled-components';
import ConfirmButton from '../../../common/ConfirmButton/ConfirmButton.tsx';

export const S = {
  ModalBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 290px;
    height: 175px;
    background-color: #fff;
    border-radius: 10px;
    padding: 15px 15px;
  `,
  ModalCloseButton: styled.button`
    align-self: flex-end;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 26px;
  `,
  ModalText: styled.span``,
  ModalButtonGroup: styled.div`
    display: flex;
    gap: 20px;
  `,
  ModalConfirmButton: styled(ConfirmButton)``,
  ModalCancelButton: styled(ConfirmButton)``,
};

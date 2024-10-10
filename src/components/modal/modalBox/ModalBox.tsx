import type { Dispatch, SetStateAction } from 'react';
import { S } from './ModalBox.ts';
import ConfirmModal from '../modalBody/ConfirmModal/ConfirmModal.tsx';

interface ModalBoxProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalBox = ({ isModalOpen, setIsModalOpen }: ModalBoxProps) => {
  return (
    <>
      {isModalOpen && (
        <S.ModalContainer>
          {/* ModalBody: 모달 열림 상태 별 조건 부 렌더링 */}
          {/* <ConfirmModal /> */}
        </S.ModalContainer>
      )}
    </>
  );
};

export default ModalBox;

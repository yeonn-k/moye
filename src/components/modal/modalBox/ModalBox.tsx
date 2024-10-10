import { ReactNode, MouseEvent } from 'react';
import { S } from './ModalBox.ts';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../store/slices/modal/modalSlice';

interface ModalBoxProps {
  children: ReactNode;
}

const ModalBox = ({ children }: ModalBoxProps) => {
  const dispatch = useDispatch();

  const handleModalDimClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    }
  };
  return (
    <S.ModalContainer onClick={handleModalDimClick}>
      {children}
    </S.ModalContainer>
  );
};

export default ModalBox;

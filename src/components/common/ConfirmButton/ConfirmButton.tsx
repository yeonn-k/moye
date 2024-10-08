import React from 'react';
import { S } from './ConfirmButton';

interface ConfirmButtonProps {
  action: 'confirm' | 'cancel';
  width?: string;
  height?: string;
}

const ConfirmButton = ({ action, width, height }: ConfirmButtonProps) => {
  return (
    <S.ConfirmButton action={action} width={width} height={height}>
      확인
    </S.ConfirmButton>
  );
};

export default ConfirmButton;

import React from 'react';
import { S } from './ConfirmButton.style.ts';

interface ConfirmButtonProps {
  action: 'confirm' | 'cancel';
  width?: string;
  height?: string;
}

const ConfirmButton = ({ action, width, height }: ConfirmButtonProps) => {
  return (
    <S.ConfirmButton action={action} width={width} height={height}>
      {action === 'confirm' ? '확인' : '취소'}
    </S.ConfirmButton>
  );
};

export default ConfirmButton;

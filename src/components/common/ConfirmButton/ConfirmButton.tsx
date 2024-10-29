import React from 'react';
import { S } from './ConfirmButton.style.ts';

interface ConfirmButtonProps {
  action: 'confirm' | 'cancel';
  width?: string;
  height?: string;
  onClick?: () => void;
}

const ConfirmButton = ({
  action,
  width,
  height,
  onClick,
}: ConfirmButtonProps) => {
  return (
    <S.ConfirmButton
      action={action}
      width={width}
      height={height}
      onClick={onClick}
    >
      {action === 'confirm' ? '확인' : '취소'}
    </S.ConfirmButton>
  );
};

export default ConfirmButton;

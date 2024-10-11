import React from 'react';
import { S } from './InnerCard';
import ConfirmButton from '../../../../components/common/ConfirmButton/ConfirmButton.tsx';

interface OuterCardProps {
  status: string;
}
const InnerCard = ({ status }: OuterCardProps) => {
  return (
    <S.Card>
      <S.FlexBox>
        <S.Icon status={status} />
        <S.GuestName>김지연</S.GuestName>
      </S.FlexBox>
      <S.Line status={status} />
      <S.PendingFlexBox>
        <div>
          <S.Content>인원: 3명</S.Content>
          <S.Content>시간: 10:00 - 12:00</S.Content>
          <S.Content>연락처: 010-0000-0000</S.Content>
        </div>
        {status === 'pending' && (
          <S.BtnFlex>
            <ConfirmButton action="confirm" width="104px" height="32px" />
            <ConfirmButton action="cancel" width="104px" height="32px" />
          </S.BtnFlex>
        )}
      </S.PendingFlexBox>
    </S.Card>
  );
};

export default InnerCard;

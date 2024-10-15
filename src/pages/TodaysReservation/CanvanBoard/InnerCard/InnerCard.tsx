import React from 'react';
import ConfirmButton from '../../../../components/common/ConfirmButton/ConfirmButton.tsx';

import { S } from './InnerCard.style.ts';

interface OuterCardProps {
  status: string;
  item: Items;
}

interface Items {
  name: string;
  count: number;
  startTime: string;
  endTime: string;
  phone: string;
  status: string;
}

const InnerCard = ({ status, item }: OuterCardProps) => {
  return (
    <S.Card>
      <S.FlexBox>
        <S.Icon status={status} />
        <S.GuestName>{item.name}</S.GuestName>
      </S.FlexBox>
      <S.Line status={status} />
      <S.PendingFlexBox>
        <div>
          <S.Content>인원: {item.count}명</S.Content>
          <S.Content>
            시간: {item.startTime} - {item.endTime}
          </S.Content>
          <S.Content>연락처: {item.phone}</S.Content>
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

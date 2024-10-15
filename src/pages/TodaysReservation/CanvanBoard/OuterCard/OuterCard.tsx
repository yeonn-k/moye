import React from 'react';

import InnerCard from '../InnerCard/InnerCard.tsx';

import { S } from './OuterCard.style.ts';
import { isGetAccessorDeclaration } from 'typescript';

interface CanvanBoardProps {
  status: string;
  filtered: Items[];
}

interface Items {
  name: string;
  count: number;
  startTime: string;
  endTime: string;
  phone: string;
  status: string;
}

const OuterCard = ({ status, filtered }: CanvanBoardProps) => {
  const statusTitle = () => {
    if (status === 'accept') {
      return '예약 확정';
    }
    if (status === 'pending') {
      return '대기 중';
    } else return '지나간 예약';
  };
  return (
    <S.CardBox>
      <S.TitleBox>
        <S.CardName>{statusTitle()}</S.CardName>
        <S.Amount>
          {filtered.length}
          <S.LilFont>건</S.LilFont>
        </S.Amount>
      </S.TitleBox>
      <S.Line status={status} />
      <S.ColorBox status={status}>
        <S.ScrollBox>
          {filtered.map((item, idx) => {
            return <InnerCard key={idx} status={status} item={item} />;
          })}
        </S.ScrollBox>
      </S.ColorBox>
    </S.CardBox>
  );
};

export default OuterCard;

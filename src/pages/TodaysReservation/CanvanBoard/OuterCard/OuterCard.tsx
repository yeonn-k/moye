import React from 'react';

import InnerCard from '../InnerCard/InnerCard.tsx';

import { S } from './OuterCard.style.ts';

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
  return (
    <S.CardBox>
      <S.TitleBox>
        <S.CardName>예약 확정</S.CardName>
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

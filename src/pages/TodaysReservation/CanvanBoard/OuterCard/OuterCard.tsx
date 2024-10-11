import React from 'react';
import InnerCard from '../InnerCard/InnerCard.tsx';
import { S } from './OuterCard';

interface CanvanBoardProps {
  status: string;
}

const OuterCard = ({ status }: CanvanBoardProps) => {
  return (
    <S.CardBox>
      <S.TitleBox>
        <S.CardName>예약 확정</S.CardName>
        <S.Amount>
          2<S.LilFont>건</S.LilFont>
        </S.Amount>
      </S.TitleBox>
      <S.Line status={status} />
      <S.ColorBox status={status}>
        <S.ScrollBox>
          <InnerCard status={status} />
          <InnerCard status={status} />
          <InnerCard status={status} />
          <InnerCard status={status} />
        </S.ScrollBox>
      </S.ColorBox>
    </S.CardBox>
  );
};

export default OuterCard;

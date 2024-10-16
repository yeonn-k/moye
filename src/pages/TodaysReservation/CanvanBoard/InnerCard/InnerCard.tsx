import React, { useEffect, useState } from 'react';
import ConfirmButton from '../../../../components/common/ConfirmButton/ConfirmButton.tsx';

import { S } from './InnerCard.style.ts';
import api from '../../../../services/api.ts';
import { BASE_URL } from '../../../../config/config.ts';
import useCheckTheDate from '../../../../hooks/useCheckTheDate.tsx';

interface OuterCardProps {
  status: string;
  item: Items;
  setIsRerender: React.Dispatch<React.SetStateAction<boolean>>;
  oClock: boolean;
}

interface Items {
  id: number;
  name: string;
  count: number;
  startTime: string;
  endTime: string;
  phone: string;
  status: string;
}

const InnerCard = ({ status, item, setIsRerender, oClock }: OuterCardProps) => {
  const { hour } = useCheckTheDate();

  const putChangeReservationsState = async () => {
    setIsRerender(true);

    const id = item.id;
    try {
      const res = await api.put(`${BASE_URL}/reservations/${id}`, {
        state: 'ACCEPT',
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const putChangePassedState = async () => {
    setIsRerender(true);

    const id = item.id;
    if (
      item.status === 'PENDING' &&
      parseInt(item.startTime.slice(0, 2)) <= hour
    ) {
      try {
        const res = await api.put(`${BASE_URL}/reservations/${id}`, {
          state: 'CANCEL',
        });
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    putChangePassedState();
  }, [oClock]);

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
            <ConfirmButton
              action="confirm"
              width="104px"
              height="32px"
              onClick={putChangeReservationsState}
            />
            <ConfirmButton action="cancel" width="104px" height="32px" />
          </S.BtnFlex>
        )}
      </S.PendingFlexBox>
    </S.Card>
  );
};

export default InnerCard;

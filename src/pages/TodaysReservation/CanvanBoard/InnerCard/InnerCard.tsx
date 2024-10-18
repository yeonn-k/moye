import React, { useEffect } from 'react';

import ConfirmButton from '../../../../components/common/ConfirmButton/ConfirmButton.tsx';

import axios from 'axios';
import { APIS, BASE_URL } from '../../../../config/config.ts';

import useCheckTheDate from '../../../../hooks/useCheckTheDate.tsx';
import useCheckAuth from '../../../../hooks/useCheckAuth.tsx';

import { S } from './InnerCard.style.ts';
import EmailForm from './EmailForm/EmailForm.tsx';
import { RootState } from '../../../../store/store.ts';
import { useSelector } from 'react-redux';

interface OuterCardProps {
  status: string;
  item: Items;
  setIsRerender: React.Dispatch<React.SetStateAction<boolean>>;
  oClock: boolean;
  thirty: boolean;
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

const InnerCard = ({
  status,
  item,
  setIsRerender,
  oClock,
  thirty,
}: OuterCardProps) => {
  const { hour, minute } = useCheckTheDate();
  const { auth } = useCheckAuth();
  const storeName = useSelector(
    (state: RootState) => state.auth.store?.businessName,
  );

  const sendEmail = async () => {
    const title = `안녕하세요 Moye입니다! ${storeName}예약 확정 안내 메일 보내드립니다.`;
    try {
      const res = await axios.post(`${APIS}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'recipient@example.com',
          subject: title,
          html: EmailForm,
        }),
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const putAcceptReservationsState = async () => {
    const id = item.id;
    try {
      const res = await axios.put(
        `${BASE_URL}/reservations/${id}`,
        { state: 'ACCEPT' },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      console.log(res);
      // sendEmail()
      setIsRerender((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const putCancelReservationsState = async () => {
    const id = item.id;
    try {
      const res = await axios.put(
        `${BASE_URL}/reservations/${id}`,
        { state: 'CANCEL' },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      console.log(res);
      setIsRerender((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const putChangePassedState = async () => {
    const id = item.id;
    const start = () => {
      if (parseInt(item.startTime[3]) !== 0) {
        return parseInt(item.startTime.slice(0, 2)) + 0.5;
      } else return parseInt(item.startTime.slice(0, 2));
    };

    const now = () => {
      if (minute >= 30) {
        return hour + 0.5;
      } else return hour;
    };
    if (item.status === 'PENDING' && start() <= now()) {
      try {
        const res = await axios.put(
          `${BASE_URL}/reservations/${id}`,
          { state: 'CANCEL' },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          },
        );
        console.log(res);
        setIsRerender(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    putChangePassedState();
  }, [oClock, thirty]);

  return (
    <>
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
                onClick={putAcceptReservationsState}
              />
              <ConfirmButton
                action="cancel"
                width="104px"
                height="32px"
                onClick={putCancelReservationsState}
              />
            </S.BtnFlex>
          )}
        </S.PendingFlexBox>
      </S.Card>
    </>
  );
};

export default InnerCard;

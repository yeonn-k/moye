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
  email: string;
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

  const sendEmail = async (state: string) => {
    const emailForm = `
    <div style="margin: 0 auto; padding: 10px; justify-content: center; align-items: center; text-align: center; background-color: #fff; width: 600px; height: 400px; border-radius: 5px; border: 6px solid #A8E1B2;">
      <div style="margin-top: 76px; margin-bottom: 34px;">
        <img src="cid:logo" alt="Logo" style="width: 100px; height: 42px;" />
      </div>
      <p style="font-size: 20px; margin-bottom: 20px; text-align: center;">
        안녕하세요, <span style="color: #3C9A5D; font-weight: 600;">${item.name}님!</span>
      </p>
      <br />
      <p style="line-height: 30px; text-align: center;">
    모두의 예약을 돕는 <span style="color: #3C9A5D; font-weight: 600;">MoYe</span> 입니다.<br />
    ${item.name}님, <span style="color: #3C9A5D; font-weight: 600;">${storeName}의 ${item.startTime} 예약이 ${state}</span> 되었습니다.<br />
    즐거운 시간 보내시길 바랍니다!
      </p>
      </div>`;

    const title = `안녕하세요 Moye입니다! ${storeName}의 예약 확정 안내 메일 보내드립니다.`;
    try {
      const res = await axios.post(
        `${BASE_URL}/send-email`,
        {
          subject: title,
          email: item.email,
          content: emailForm,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
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

      sendEmail('확정');
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
      sendEmail('취소');
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
        sendEmail('취소');
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

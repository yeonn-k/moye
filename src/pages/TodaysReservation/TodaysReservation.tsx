import React, { useEffect, useState } from 'react';
import { S } from './TodaysReservation';
import UserInput from '../../components/common/UserInput/UserInput.tsx';
import TimelineBox from './TimelineBox/TimelineBox.tsx';
import CanvanBoard from './CanvanBoard/CanvanBoard.tsx';

import { URL, PORT } from '../../config/config.ts';

import api from '../../services/api.ts';
import useCheckTheDate from '../../hooks/useCheckTheDate.tsx';

interface Items {
  name: string;
  count: number;
  startTime: string;
  endTime: string;
  phone: string;
  status: string;
}

const TodaysReservation = ({}) => {
  const [items, setItems] = useState<Items[]>([]);
  const { month, date, days, day } = useCheckTheDate();
  const [businessHrs, setBusinessHrs] = useState({
    open: 0,
    close: 0,
  });

  const getTodaysReservation = async () => {
    const storeId = 1;
    try {
      const res = await api.get(
        `${URL}:${PORT}/reservations/${storeId}/stores`,
      );
      setItems(res.data.body);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodaysReservation();
  }, []);
  console.log(items);

  return (
    <S.TodaysReservation>
      <S.StoreName>store Name</S.StoreName>
      <S.UpperBox>
        <S.FlexBox>
          <div>
            <S.Todays>오늘의 예약</S.Todays>
            <S.Date>{`${month}월 ${date}일 ${days[day]}요일`}</S.Date>
          </div>
          <S.InputBox>
            <S.SearchIcon />
            <UserInput
              placeholder="예약자명을 입력하세요"
              width="220px"
              color="white"
              height="25px"
            />
          </S.InputBox>
        </S.FlexBox>
        <S.TimelineBox>
          <TimelineBox items={items} />
        </S.TimelineBox>
      </S.UpperBox>
      <CanvanBoard items={items} />
    </S.TodaysReservation>
  );
};

export default TodaysReservation;

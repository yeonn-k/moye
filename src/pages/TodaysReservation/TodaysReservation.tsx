import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../../config/config.ts';

import TimelineBox from './TimelineBox/TimelineBox.tsx';
import CanvanBoard from './CanvanBoard/CanvanBoard.tsx';

import UserInput from '../../components/common/UserInput/UserInput.tsx';
import useCheckTheDate from '../../hooks/useCheckTheDate.tsx';
import useInputValue from '../../hooks/useInputValue.tsx';

import api from '../../services/api.ts';

import { S } from './TodaysReservation.style.ts';

interface Items {
  name: string;
  count: number;
  startTime: string;
  endTime: string;
  phone: string;
  status: string;
}

const TodaysReservation = ({}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const storeId = searchParams.get('storeId');
  const storeId = 3;

  const [items, setItems] = useState<Items[]>([]);
  const { month, date, days, day } = useCheckTheDate();
  const [businessHrs, setBusinessHrs] = useState({
    open: '',
    close: '',
  });
  const [inputValue, setInputValue] = useInputValue();

  const [operating, setOperating] = useState<number[]>([]);

  const getTodaysReservation = async () => {
    try {
      const res = await api.get(`${BASE_URL}/stores/${storeId}/reservations`);
      setItems(res.data.body.reservations);
      setBusinessHrs({ open: res.data.body.open, close: res.data.body.close });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodaysReservation();
  }, []);

  const filteredItems: Items[] = items.filter((item) => {
    return item.name.includes(inputValue) || item.phone.includes(inputValue);
  });

  const openTime = () => {
    const open = parseInt(businessHrs.open.slice(0, 2));

    const checkClose = () => {
      if (parseInt(businessHrs.close[2]) !== 0) {
        return parseInt(businessHrs.close.slice(0, 2)) + 1;
      } else return parseInt(businessHrs.close.slice(0, 2));
    };

    const close = checkClose();

    const newOperating = [];
    for (let i = open; i <= close; i++) {
      newOperating.push(i);
    }

    setOperating(newOperating);
  };

  useEffect(() => {
    openTime();
  }, [businessHrs]);

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
              value={inputValue}
              onChange={setInputValue}
            />
          </S.InputBox>
        </S.FlexBox>
        <S.TimelineBox>
          <TimelineBox items={filteredItems} operating={operating} />
        </S.TimelineBox>
      </S.UpperBox>
      <CanvanBoard items={filteredItems} />
    </S.TodaysReservation>
  );
};

export default TodaysReservation;

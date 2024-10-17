import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Dropdown from '../../components/common/Dropdown/Dropdown.tsx';
import CalendarWrap from './CalendarWrap/CalendarWrap.tsx';
import useCheckTheDate from '../../hooks/useCheckTheDate.tsx';
import { openModal } from '../../store/slices/modal/modalSlice.ts';
import useCheckAuth from '../../hooks/useCheckAuth.tsx';

import { S } from './MonthList.style.ts';

import { useLocation } from 'react-router-dom';
import { APIS } from '../../config/config.ts';

interface Items {
  [key: string]: { ACCEPT: number; PENDING: number; CANCEL: number };
}

const MonthList = () => {
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState<string>('');
  const [items, setItems] = useState<Items>({});

  const status = ['전체', '예약 확정', '대기중', '예약 취소'];

  const { month, date, days, day } = useCheckTheDate();
  const { auth } = useCheckAuth();

  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const storeId = searchParams.get('storeId')
  const storeId = 3;
  const handleOpenSearchModal = () => {
    dispatch(openModal('search'));
  };

  const getItems = async (month: number) => {
    try {
      const res = await axios.get(
        `${APIS.store}/${storeId}/reservations?month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      setItems(res.data.body);
    } catch (err) {
      console.error('❌ getMonthlyList: ', err);
    }
  };

  useEffect(() => {
    getItems(month);
  }, []);

  useEffect(() => {
    let total = 0;
    for (const key in items) {
      if (key in items) {
        const { ACCEPT } = items[key];

        if (ACCEPT) {
          total += ACCEPT;
        }
      }
    }
    setCount(total);
  }, [items]);

  return (
    <S.MonthList>
      <S.FlexBoxBetween>
        <S.FlexBox>
          <S.StoreName>store Name</S.StoreName>
          <S.Today>{`${month}월 ${date}일 ${days[day]}요일`}</S.Today>
        </S.FlexBox>
        <S.AlignCenter>
          <Dropdown height="40px" options={status} setSelected={setSelected} />
          <S.SearchBtn onClick={handleOpenSearchModal}>
            <S.IconImg />
          </S.SearchBtn>
        </S.AlignCenter>
      </S.FlexBoxBetween>
      <S.Container>
        <CalendarWrap items={items} selected={selected} />
      </S.Container>
      <S.SummaryBox>
        <S.SummaryText>{month}월의 총 예약 개수</S.SummaryText>
        <S.Circle>
          <S.TextBox>
            <S.SumNumber>{count}</S.SumNumber>
            <S.SumLiltext>건</S.SumLiltext>
          </S.TextBox>
        </S.Circle>
      </S.SummaryBox>
    </S.MonthList>
  );
};

export default MonthList;

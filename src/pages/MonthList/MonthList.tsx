import React, { useState, useEffect } from 'react';
import { S } from './MonthList';
import Dropdown from '../../components/common/Dropdown/Dropdown.tsx';
import CalendarWrap from './CalendarWrap/CalendarWrap.tsx';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/slices/modal/modalSlice.ts';
import useCheckTheDate from '../../hooks/useCheckTheDate.tsx';
import axios from 'axios';

import { URL } from '../../config/config';

interface Items {
  [key: string]: { ACCEPT: number; PENDING: number; CANCEL: number };
}

interface Item {
  ACCEPT: number;
  PENDING: number;
  CANCEL: number;
}

const MonthList = () => {
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState('');

  const { month, date, days, day } = useCheckTheDate();
  const dispatch = useDispatch();
  const handleOpenSearchModal = () => {
    dispatch(openModal('search'));
  };

  const status = ['전체', '예약 확정', '대기중', '예약 취소'];

  const [items, setItems] = useState<Items>({});

  const getItems = async (month: number) => {
    try {
      const storeId = 1;
      const res = await axios.get(
        `${URL}/reservations/${storeId}/stores?month=10`,
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

  const filteredItems = (items: Items): Items => {
    const filteredItems: Items = {};

    // ❓ 데이터가 객체로 되어 있어서 필터가 '전체'일 경우 그냥 items를 내려주고,
    // 아닐 경우 객체 내에서 키를 통해 값을 필터링하고 해당하는 값만 담은 filteredItems를 내려주어 렌더링 하려고 합니다 !

    // 그런데 seleted(dropDown으로 선택된 값)에 따라 키를 어떻게 선택할 수 있을 지 잘 모르겠습니다...
    // if (selected === '예약 확정') {
    // }

    Object.keys(items).forEach((item) => {
      if (items[item].ACCEPT > 0) {
        filteredItems[item] = {
          ACCEPT: items[item].ACCEPT,
          PENDING: 0,
          CANCEL: 0,
        };
      }
    });

    return filteredItems;
  };

  // filteredItems(items);

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

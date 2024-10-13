import React from 'react';
import { S } from './MonthList';
import Dropdown from '../../components/common/Dropdown/Dropdown.tsx';
import CalendarWrap from './CalendarWrap/CalendarWrap.tsx';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/slices/modal/modalSlice.ts';
import useCheckTheDate from '../../hooks/useCheckTheDate.tsx';

const MonthList = () => {
  const { year, month, date, days, day } = useCheckTheDate();
  const dispatch = useDispatch();
  const handleOpenSearchModal = () => {
    dispatch(openModal('search'));
  };

  const status = ['예약 확정', '대기중', '예약 취소'];

  return (
    <S.MonthList>
      <S.FlexBoxBetween>
        <S.FlexBox>
          <S.StoreName>store Name</S.StoreName>
          <S.Today>{`${month}월 ${date}일 ${days[day]}요일`}</S.Today>
        </S.FlexBox>
        <S.AlignCenter>
          <Dropdown height="40px" options={status} />
          <S.SearchBtn onClick={handleOpenSearchModal}>
            <S.IconImg />
          </S.SearchBtn>
        </S.AlignCenter>
      </S.FlexBoxBetween>
      <S.Container>
        <CalendarWrap year={year} month={month} date={date} />
      </S.Container>
      <S.SummaryBox>
        <S.SummaryText>{month}월의 총 예약 개수</S.SummaryText>
        <S.Circle>
          <S.TextBox>
            <S.SumNumber>13</S.SumNumber>
            <S.SumLiltext>건</S.SumLiltext>
          </S.TextBox>
        </S.Circle>
      </S.SummaryBox>
    </S.MonthList>
  );
};

export default MonthList;

import React from 'react';
import { S } from './MonthList';
import Dropdown from '../../components/common/Dropdown/Dropdown.tsx';
import CalendarWrap from './CalendarWrap/CalendarWrap.tsx';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/slices/modal/modalSlice.ts';

const MonthList = () => {
  const dispatch = useDispatch();
  const handleOpenSearchModal = () => {
    dispatch(openModal('search'));
  };
  return (
    <S.MonthList>
      <S.FlexBoxBetween>
        <S.FlexBox>
          <S.StoreName>store Name</S.StoreName>
          <S.Today>10월 11일 금요일</S.Today>
        </S.FlexBox>
        <S.AlignCenter>
          <Dropdown />
          <S.SearchBtn onClick={handleOpenSearchModal}>
            <S.IconImg />
          </S.SearchBtn>
        </S.AlignCenter>
      </S.FlexBoxBetween>
      <S.Container>
        <CalendarWrap />
      </S.Container>
      <S.SummaryBox>
        <S.SummaryText>10월의 총 예약 개수</S.SummaryText>
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

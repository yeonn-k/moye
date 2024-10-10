import React from 'react';
import { S } from './TodaysReservation';
import UserInput from '../../components/common/UserInput/UserInput.tsx';
import TimelineBox from './TimelineBox/TimelineBox.tsx';

const TodaysReservation = () => {
  return (
    <S.TodaysReservation>
      <S.StoreName>store Name</S.StoreName>
      <S.UpperBox>
        <S.FlexBox>
          <div>
            <S.Todays>오늘의 예약</S.Todays>
            <S.Date>10월 07일 월요일</S.Date>
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
          <TimelineBox />
        </S.TimelineBox>
      </S.UpperBox>
      <S.DashBoardBox>
        <S.Card />
        <S.Card />
        <S.Card />
      </S.DashBoardBox>
    </S.TodaysReservation>
  );
};

export default TodaysReservation;

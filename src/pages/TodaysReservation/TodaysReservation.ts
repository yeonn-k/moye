import styled from 'styled-components';

export const S = {
  TodaysReservation: styled.div`
    margin: 0 auto;
    margin-top: 80px;
    box-sizing: border-box;

    width: 1440px;
  `,
  StoreName: styled.header`
    color: ${(props) => props.theme.color.green};
    font-size: 28px;
    font-weight: 900;
  `,
  UpperBox: styled.section`
    width: 1386px;
    height: 426px;
    border: 3px solid ${(props) => props.theme.color.green};
  `,
  Todays: styled.span``,
  Date: styled.span``,
  InputBox: styled.div`
    display: flex;
    align-items: center;

    width: 260px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.color.lightGreen};
  `,
  SearchIcon: styled.div`
    margin-left: 5px;
    width: 18px;
    height: 18px;
    background-image: url('/icons/searchIcon.svg');
    background-size: contain;
    background-repeat: no-repeat;
  `,
  TimelineBox: styled.div``,

  DashBoardBox: styled.section``,
};

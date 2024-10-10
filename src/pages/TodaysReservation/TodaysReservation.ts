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
    margin-top: 8px;
    width: 1386px;
    height: 426px;
    padding: 18px;
    box-sizing: border-box;

    border: 3px solid ${(props) => props.theme.color.green};
    border-radius: 5px;
  `,
  Todays: styled.span`
    font-size: 28px;
    font-weight: 700;
    color: ${(props) => props.theme.color.deepGreen};
    margin-right: 14px;
  `,
  Date: styled.span`
    font-weight: 600;
    color: ${(props) => props.theme.color.deepGreen};
  `,
  InputBox: styled.div`
    display: flex;
    align-items: center;

    width: 260px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.color.lightGreen};
  `,
  FlexBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `,

  SearchIcon: styled.div`
    margin-left: 5px;
    width: 18px;
    height: 18px;
    background-image: url('/icons/searchIcon.svg');
    background-size: contain;
    background-repeat: no-repeat;
  `,
  TimelineBox: styled.div`
    height: 326px;
    border-radius: 5px;
    border: 4px solid #89e46a;

    padding: 24px;
  `,

  DashBoardBox: styled.section`
    display: flex;
    justify-content: space-between;

    width: 1386px;
    height: 404px;
  `,
  Card: styled.div`
    width: 448px;
    height: 404px;
    background-color: ${(props) => props.theme.color.paleCoral};
  `,
};

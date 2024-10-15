import styled from 'styled-components';

export const S = {
  MonthList: styled.div`
    margin: 0 auto;
    margin-top: 80px;
    box-sizing: border-box;

    width: 1386px;
  `,
  FlexBoxBetween: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  FlexBox: styled.div`
    display: flex;
    align-items: baseline;
  `,
  AlignCenter: styled.div`
    display: flex;
    align-items: center;
  `,
  StoreName: styled.header`
    color: ${(props) => props.theme.color.green};
    font-size: 28px;
    font-weight: 900;
    margin-right: 10px;
  `,
  Today: styled.span`
    font-weight: 700;
    color: ${(props) => props.theme.color.deepGreen};
    margin-right: 14px;
  `,
  Container: styled.section`
    margin-top: 14px;
    width: 1386px;
    height: 686px;
    padding: 18px;
    box-sizing: border-box;

    border: 3px solid ${(props) => props.theme.color.green};
    border-radius: 5px;
  `,
  SearchBtn: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: ${(props) => props.theme.color.green};
    border-radius: 5px;
    margin-left: 14px;
  `,
  IconImg: styled.div`
    background-image: url('/icons/magnifierIcon.svg');
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
  `,
  SummaryBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;

    width: 1386px;
    height: 146px;
  `,
  SummaryText: styled.span`
    margin-bottom: 20px;
  `,
  Circle: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 90px;
    height: 90px;
    background-color: ${(props) => props.theme.color.paleGreen};
    border-radius: 100%;
  `,
  TextBox: styled.div`
    display: flex;
    align-items: end;
    gap: 2px;
  `,
  SumNumber: styled.span`
    font-size: 28px;
    font-weight: 700;
    color: ${(props) => props.theme.color.deepGreen};
  `,
  SumLiltext: styled.span`
    font-size: 16px;
    color: ${(props) => props.theme.color.deepGreen};
  `,
};

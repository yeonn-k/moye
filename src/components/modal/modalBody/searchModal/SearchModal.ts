import styled from 'styled-components';

export const S = {
  SearchModal: styled.div`
    width: 640px;
    height: 310px;
    background-color: #fff;
    border-radius: 5px;
    padding: 26px;
  `,
  FlexBox: styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
  InputBox: styled.div`
    display: flex;
    align-items: center;

    width: 500px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.color.lightGreen};
  `,
  Title: styled.span``,
  SearchIcon: styled.div`
    margin-left: 5px;
    width: 18px;
    height: 18px;
    background-image: url('/icons/searchIcon.svg');
    background-size: contain;
    background-repeat: no-repeat;
  `,
  Line: styled.div`
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.color.lightGreen};
    margin: 12px 0;
  `,
  ListTitle: styled.div`
    text-align: center;
  `,
  Table: styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 2fr 2fr;
  `,
  Cell: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

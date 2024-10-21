import styled from 'styled-components';

export const S = {
  SearchModal: styled.div`
    z-index: 10;
    position: relative;

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
    margin-top: 12px;
  `,
  ListTitle: styled.div`
    margin-top: 12px;
    text-align: center;
  `,
  Table: styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 2fr 2fr;

    position: absolute;

    overflow: scroll;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
      display: none;
    }
    height: 180px;
    width: 92%;
  `,
  Cell: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 14px;
  `,
  FullCell: styled.div`
    grid-column: 1 / span 5;
    display: flex;
    justify-content: center;
    align-items: center;

    height: 160px;
  `,
};

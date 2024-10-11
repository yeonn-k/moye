import styled from 'styled-components';

export const ESD = {
  EditStoreDetail: styled.div`
    height: 100%;
  `,
  TopBar: styled.div`
    font-size: 28px;
    font-weight: bold;
    color: ${(props) => props.theme.color.green};
    text-align: center;
    padding: 8px 12px;
  `,
  Body: styled.div`
    display: flex;
    padding: 8px 12px;
    li {
      padding: 4px 8px;
      margin: 8px 8px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        width: 40%;
      }
      div {
        margin-left: auto;
      }
      input {
        border: 1px solid ${(props) => props.theme.color.green};
        border-radius: 5px;
        height: 28px;
        padding: 4px;
      }
    }
  `,
  BodyLeft: styled.div`
    padding: 8px 12px;
    width: 50%;
  `,
  BodyRight: styled.div`
    padding: 8px 12px;
    width: 50%;
    img {
      width: 400px;
      height: 300px;
      object-fix: contain;
      border: 2px solid ${(props) => props.theme.color.green};
      border-radius: 5px;
    }
  `,
  TimeInput: styled.input`
    width: 50px;
    text-align: center;
  `,
};

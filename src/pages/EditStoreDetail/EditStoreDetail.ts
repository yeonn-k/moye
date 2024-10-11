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
    button {
      padding: 8px 12px;
      border: 2px solid ${(props) => props.theme.color.green};
      border-radius: 10px;
      background: transparent;
      cursor: pointer;
    }
    li span {
      width: 25%;
    }
    li div label {
      cursor: pointer;
      input {
        display: none;
      }
      span {
        width: 30px;
        position: relative;
        display: inline-block;
        background: white;
        margin: 4px 4px;
        padding: 4px 8px;
        color: ${(props) => props.theme.color.green};
        border: 1px solid ${(props) => props.theme.color.green};
        border-radius: 10px;
        font-size: 13px;
        transition: 0.5s;
        user-select: none;
        overflow: hidden;
      }
      span:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: white;
      }
      input:checked ~ span {
        color: white;
        background: ${(props) => props.theme.color.darkGreen};
      }
    }
  `,
  TimeInput: styled.input`
    width: 50px;
    text-align: center;
  `,
};

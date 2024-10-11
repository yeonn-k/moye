import styled from 'styled-components';

export const SD = {
  TopBar: styled.div`
    margin: 0px 12px;
    padding: 8px 12px;
    justify-content: space-between;
    display: flex;
    border-style: solid;
    border-color: ${(props) => props.theme.color.green};
    border-width: 0px 0px 4px 0px;
    p {
      font-size: 28px;
      font-weight: bold;
      color: ${(props) => props.theme.color.green};
    }
    button {
      padding: 8px 12px;
      border: 2px solid ${(props) => props.theme.color.green};
      border-radius: 10px;
      background: transparent;
      cursor: pointer;
    }
  `,
  Body: styled.div`
    padding: 8px 12px;
    display: flex;
    height: 100%;
  `,
  BodyLeft: styled.div`
    padding: 8px 12px;
    width: 40%;
    li {
      margin: 12px 8px;
    }
    span {
      font-weight: bold;
    }
    img {
      width: 80%;
      object-fix: contain;
      border: 1px solid;
      margin: 12px 24px;
    }
  `,
  BodyRight: styled.div`
    padding: 8px 12px;
    width: 60%;
  `,
  OperatingTimeTable: styled.table`
    border: 1px solid ${(props) => props.theme.color.darkGreen};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    width: 100%;
    border-collapse: collapse;
    border-radius: 5px;
    overflow: hidden;
    thead {
      background: ${(props) => props.theme.color.lightGreen};
    }
    td,
    th {
      padding: 8px 4px;
      vertical-align: center;
      text-align: center;
    }
    td {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  `,
  Description: styled.div`
    height: 60%;
    span {
      font-size: 28px;
      font-weight: bold;
      color: ${(props) => props.theme.color.green};
    }
  `,
};

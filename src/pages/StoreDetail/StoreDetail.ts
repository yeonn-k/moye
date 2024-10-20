import styled from 'styled-components';

export const SD = {
  Main: styled.div`
    max-width: 1080px;
    margin: 0 auto;
  `,
  TopBar: styled.div`
    margin: 12px 12px;
    padding: 24px 12px;
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
    width: 50%;
    ul {
      margin: 20px 60px;
    }
    li {
      margin: 12px 8px;
    }
    span {
      font-weight: bold;
    }
  `,
  StoreImageContainer: styled.div`
    width: 100%;
    height: 520px;
  `,
  StoreImage: styled.img`
    width: 500px;
    height: 500px;
    border: none;
    object-fit: contain;
  `,
  BodyRight: styled.div`
    padding: 8px 12px;
    width: 50%;
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
    margin-top: 20px;
    height: 60%;
    span {
      font-size: 28px;
      font-weight: bold;
      color: ${(props) => props.theme.color.green};
    }
    div {
      width: 100%;
      border-top: 2px solid ${(props) => props.theme.color.green};
      margin-top: 20px;
      padding-top: 20px;
    }
  `,
};

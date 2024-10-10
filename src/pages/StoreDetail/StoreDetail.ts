import styled from 'styled-components';

export const SD = {
  StoreDetail: styled.div`
    height: 100%;
  `,
  StoreDetailBody: styled.div`
    padding: 8px 12px;
    display: flex;
  `,
  StoreDetailTopBar: styled.div`
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
  `,
  StoreDetailBodyLeft: styled.div`
    padding: 8px 12px;
    width: 40%;
    span {
      font-weight: bold;
    }
    img {
      width: 600px;
      height: 400px;
      object-fix: contain;
      border: 1px solid;
    }
  `,
  StoreDetailBodyRight: styled.div`
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

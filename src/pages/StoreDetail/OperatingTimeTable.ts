import styled from 'styled-components';

export const T = {
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
};

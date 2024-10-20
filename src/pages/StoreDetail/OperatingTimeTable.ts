import styled from 'styled-components';

export const T = {
  OperationTimeTalbeContainer: styled.div`
    width: 100%;
    height: 360px;
    padding: 0;
    margin: 0;
  `,
  OperatingTimeTable: styled.table`
    border: 1px solid ${(props) => props.theme.color.darkGreen};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 300px;
    border-collapse: collapse;
    border-radius: 5px;
    overflow: hidden;
    thead {
      background: ${(props) => props.theme.color.lightGreen};
    }

    td,
    th {
      width: 37%;
      padding: 8px 4px;
      align-content: center;
      text-align: center;
    }
    td {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  `,
  LeftHeader: styled.th`
    &&& {
      width: 26%;
    }
  `,
  LeftCol: styled.td`
    &&& {
      width: 26%;
    }
  `,
  RegularHoliday: styled.span`
    color: ${(props) => props.theme.color.navy};
  `,
  IrregularHoliday: styled.span`
    color: ${(props) => props.theme.color.coral};
  `,
};

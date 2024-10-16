import styled from 'styled-components';

interface girdProps {
  operatingNum: number;
}

interface itemProps {
  start: number;
  end: number;
  status: string;
}

export const S = {
  TimelineBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    width: 100%;
    height: 100%;
  `,
  TimeBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: center;
  `,
  Time: styled.div``,
  Grid: styled.div<girdProps>`
    position: relative;

    display: grid;
    grid-template-columns: repeat(${(props) => props.operatingNum}, 1fr);
    grid-gap: 0;

    width: 99%;
    height: 92%;
    margin-top: 14px;
    border-left: 1px solid ${(props) => props.theme.color.paleGray};
  `,
  Cell: styled.div`
    border-right: 1px solid ${(props) => props.theme.color.paleGray};
    height: 100%;
  `,
  ItemGrid: styled.div`
    position: absolute;
    overflow: scroll;
    height: 100%;

    display: grid;
    grid-template-columns: auto;
  `,

  ItemWrap: styled.div<girdProps>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.operatingNum}, 1fr);

    grid-gap: 0;

    width: 100%;
    max-height: 248px;
  `,

  Item: styled.div<itemProps>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: 14px;
    margin-top: 12px;
    grid-column: ${(props) => props.start + 1} / span
      ${(props) => props.end - props.start};
    height: 40px;
    background-color: ${(props) =>
      props.status === 'ACCEPT'
        ? props.theme.color.paleCoral
        : props.status === 'PENDING'
          ? props.theme.color.paleGreen
          : props.theme.color.paleNavy};
  `,
};

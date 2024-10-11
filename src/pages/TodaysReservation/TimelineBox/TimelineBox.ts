import styled from 'styled-components';

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
  Grid: styled.div`
    position: relative;

    display: grid;
    grid-template-columns: repeat(8, 1fr);
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
    overflow: scroll;
    position: absolute;

    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0;

    width: 100%;
    max-height: 248px;
  `,

  Item: styled.div`
    display: flex;
    align-items: center;
    padding-left: 14px;
    margin-top: 14px;
    grid-column: 1 / span 2;
    height: 34px;
    background-color: ${(props) => props.theme.color.paleCoral};
  `,
};

import styled from 'styled-components';

interface CanvanBoardProps {
  status: string;
}

export const S = {
  CardBox: styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 448px;
    height: 404px;
  `,
  TitleBox: styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 130px;
    height: 40px;
  `,
  CardName: styled.span`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 20px;
    font-weight: 600;
  `,
  Amount: styled.span`
    font-size: 20px;

    color: ${(props) => props.theme.color.deepGreen};
  `,

  LilFont: styled.span`
    font-size: 16px;
  `,
  Refresh: styled.div`
    position: absolute;
    right: -146px;
    top: 10px;

    background-image: url('/icons/refreshIcon.svg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 24px;
    height: 24px;

    &:hover {
      cursor: pointer;
    }
  `,

  Line: styled.div<CanvanBoardProps>`
    width: 448px;
    height: 3px;
    background-color: ${(props) =>
      props.status === 'accept'
        ? props.theme.color.coral
        : props.status === 'pending'
          ? props.theme.color.green
          : props.theme.color.navy};

    margin: 10px 0px;
  `,
  ColorBox: styled.div<CanvanBoardProps>`
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;

    padding: 14px;
    width: 448px;
    height: 334px;

    background-color: ${(props) =>
      props.status === 'accept'
        ? props.theme.color.paleCoral
        : props.status === 'pending'
          ? props.theme.color.paleGreen
          : props.theme.color.paleNavy};
    border-radius: 5px;
  `,
  ScrollBox: styled.div`
    overflow: scroll;
    width: 100%;
    height: 98%;
    display: flex;

    flex-wrap: wrap;
    gap: 12px;
  `,
};

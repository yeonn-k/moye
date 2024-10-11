import styled from 'styled-components';

interface OuterCardProps {
  status: string;
}

export const S = {
  Card: styled.div`
    width: 416px;
    height: 146px;
    border-radius: 5px;
    padding: 14px 0px;
    background-color: #fff;
  `,
  FlexBox: styled.div`
    display: flex;
    margin: 4px;
  `,
  Icon: styled.div<OuterCardProps>`
    background-repeat: no-repeat;

    background-image: url(${(props) =>
      props.status === 'accept'
        ? '/icons/confirmIcon.svg'
        : props.status === 'pending'
          ? '/icons/pendingIcon.svg'
          : '/icons/checkIcon.svg'});

    margin-right: 10px;
    margin-left: 16px;
    width: 20px;
    height: 20px;
  `,
  GuestName: styled.p`
    font-weight: 600;
  `,
  Line: styled.div<OuterCardProps>`
    width: 100%;
    height: 3px;
    margin-top: 10px;
    margin-bottom: 14px;
    background-color: ${(props) =>
      props.status === 'accept'
        ? props.theme.color.paleCoral
        : props.status === 'pending'
          ? props.theme.color.paleGreen
          : props.theme.color.paleNavy};
  `,
  Content: styled.p`
    margin-top: 8px;
    margin-left: 16px;
  `,
  PendingFlexBox: styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 16px;
  `,
  BtnFlex: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
};

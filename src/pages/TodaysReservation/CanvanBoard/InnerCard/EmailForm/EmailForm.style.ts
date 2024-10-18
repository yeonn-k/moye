import styled from 'styled-components';

export const S = {
  EmailForm: styled.div`
    margin: 0 auto;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #fff;
    width: 600px;
    height: 400px;
    border-radius: 5px;
    border: 6px solid ${(props) => props.theme.color.lightGreen};
  `,
  EmailBox: styled.div``,
  Logo: styled.div`
    background-image: url('/LogoGreen.svg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 100px;
    height: 42px;

    margin-left: 10px;
    margin-bottom: 34px;
  `,
  MainText: styled.div`
    font-size: 20px;
    margin-bottom: 20px;
    text-align: center;
  `,
  Context: styled.div`
    line-height: 30px;
  `,
  Highlight: styled.span`
    color: ${(props) => props.theme.color.darkGreen};
    font-weight: 600;
  `,
};

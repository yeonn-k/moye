import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import backgroundImage from '../../assets/images/backgroundImage.png';
import logo from '../../assets/images/logo.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const S = {
  LoginBox: styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
  `,
  BoxOverlay: styled.div`
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
  `,
  Logo: styled.div`
    width: 242px;
    height: 101px;
    background-image: url(${logo});
    background-size: cover;
    background-position: center;
  `,
  LoginForm: styled.form`
    width: 500px;
    height: 470px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
  `,
  FormTitle: styled.h3`
    font-size: 20px;
    color: #000;
    font-weight: 700;
  `,
  UserInputBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  SignUpPrompt: styled.div`
    display: flex;
    gap: 10px;
  `,
  SignUpPromptMessage: styled.span``,
  SignUpPromptLink: styled(Link)`
    color: ${(props) => props.theme.color.navy};
    text-decoration: none;
    cursor: pointer;
    font-weight: 600;
  `,
  UserInput: styled.input`
    width: 260px;
    height: 40px;
    border: 1px solid ${(props) => props.theme.color.green};
    border-radius: 5px;
    outline: none;
    padding-left: 10px;
    &:focus {
      box-shadow: 0 0 5px ${(props) => props.theme.color.deepGreen};
    }
  `,
  SubmitButton: styled.button`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    cursor: pointer;
    background-color: ${(props) => props.theme.color.deepGreen};
    color: #fff;
    border-radius: 5px;
    transition: transform 0.2s;
    &:active {
      transform: scale(0.95);
    }
  `,
  ErrorMessage: styled.p<{ visible?: boolean }>`
    color: ${(props) => props.theme.color.coral};
    font-size: 10px;
    font-weight: 600;
    opacity: 0;
    animation: ${fadeIn} 0.3s ease forwards;
    opacity: 1;
    display: none;
    &.visible {
      display: block;
    }
  `,
  SubmitErrorMessage: styled.p<{ visible?: boolean }>`
    color: #f00;
    font-size: 12px;
    font-weight: 600;
    opacity: 0;
    animation: ${fadeIn} 0.3s ease forwards;
    opacity: 1;
    display: none;
    &.visible {
      display: block;
    }
  `,
  ResponseErrorMessage: styled.p<{ visible?: boolean }>`
    color: #f00;
    font-size: 12px;
    font-weight: 600;
    opacity: 0;
    animation: ${fadeIn} 0.3s ease forwards;
    opacity: 1;
    display: none;
    &.visible {
      display: block;
    }
  `,
};

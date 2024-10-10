import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../../assets/images/backgroundImage.png';

export const S = {
  SignUpBox: styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
  `,
  PageTitle: styled.h2`
    font-size: 28px;
    color: #fff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  `,
  SignUpForm: styled.form`
    width: 500px;
    height: 580px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px;
  `,
  FormTitle: styled.h3`
    font-size: 16px;
    color: #000;
    font-weight: 600;
  `,
  UserInputBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  UserInputLabel: styled.label`
    display: flex;
    flex-direction: column;
    font-size: 13px;
    font-weight: 600;
    gap: 10px;
  `,
  LoginPrompt: styled.div`
    display: flex;
    gap: 10px;
  `,
  LoginPromptMessage: styled.span``,
  LoginPromptLink: styled(Link)`
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
  `,
};

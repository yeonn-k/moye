import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../../assets/images/backgroundImage.png';
import logo from '../../assets/images/logo.png';

export const S = {
  EntryPointBox: styled.div`
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
    width: 274px;
    height: 115px;
    background-image: url(${logo});
    background-size: cover;
    background-position: center;
  `,
  AuthBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  SignupButton: styled(Link)`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 305px;
    height: 60px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 5px;
    font-weight: 600;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  `,
  LoginButton: styled(Link)`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 305px;
    height: 60px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 5px;
    font-weight: 600;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  `,
};

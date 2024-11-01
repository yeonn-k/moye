import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../assets/images/logo.png';

export const N = {
  NavBar: styled.nav<{ $storeId: number }>`
    display: flex;
    align-items: center;
    justify-content: ${(props) =>
      props.$storeId > 0 ? 'flex-start' : 'space-between'};
    background-color: ${(props) => props.theme.color.lightGreen};
    height: 80px;
    padding: 8px 12px;
  `,
  NavLogo: styled.div`
    width: 158px;
    height: 50px;
    background-image: url(${logo});
    background-size: cover;
    background-position: center;
  `,
  NavMenuList: styled.ul`
    align-items: center;
    height: 100%;
    display: flex;
    flex: 1;
    list-style: none;
    padding-left: 0;
  `,
  NavMenuItem: styled.li`
    align-content: center;
    height: 100%;
    padding: 0 18px;
    &:hover {
      @keyframes navItem {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(1.3);
        }
      }
      animation: navItem 0.8s forwards;
    }
  `,
  NavMenuLink: styled(Link)`
    height: 100%;
    color: #fff;
    text-decoration: none;
    font-weight: 800;
    font-size: 20px;
  `,
  UserMenuList: styled.ul`
    display: flex;
    align-items: center;
    gap: 20px;
    list-style: none;
    padding-left: 0;
  `,
  UserMenuItem: styled.li``,
  LogoutButton: styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 98px;
    height: 40px;
    border-radius: 5px;
    font-size: 13px;
    background-color: ${(props) => props.theme.color.green};
    color: #fff;
    transition: transform 0.2s;
    &:active {
      transform: scale(0.95);
    }
    &:hover {
      cursor: pointer;
    }
  `,
  Logo: styled.img`
    width: 140px;
    height: 60px;
    margin-left: 20px;
    margin-bottom: 6px;
  `,
};

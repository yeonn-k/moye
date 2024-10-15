import styled from 'styled-components';

export const N = {
  NavBar: styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.color.lightGreen};
    height: 80px;
    padding: 8px 12px;
  `,
  NavMenu: styled.ul`
    display: flex;
    list-style: none;
    padding-left: 0;
    li {
      padding: 8px 12px;
    }
    li:hover {
      background-color: ${(props) => props.theme.color.green};
      border-radius: 4px;
    }
  `,
  UserMenu: styled.ul`
    display: flex;
    list-style: none;
    padding-left: 0;
    button {
      width: 98px;
      height: 40px;
      border-radius: 5px;
      background-color: ${(props) => props.theme.color.green};
      color: white;
    }
  `,
};

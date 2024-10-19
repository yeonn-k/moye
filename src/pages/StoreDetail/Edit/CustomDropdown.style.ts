import styled from 'styled-components';

export const D = {
  Component: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 8px;
    margin-right: 8px;
    width: 40px;
    position: relative;
  `,
  SelectButton: styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    height: 32px;
    margin-top: 8px;
    background-color: white;
    border: 1px solid ${(props) => props.theme.color.green};
    border-radius: 5px;
    padding: 4px;
    cursor: pointer;
  `,
  Select: styled.div`
    width: 95%;
    outline: none;
    border: none;
    color: ${(props) => props.theme.color.green};
    font-size: 16px;
    text-align: center;
  `,
  Dropdown: styled.div`
    position: absolute;
    width: 100%;
    background-color: white;
    border-radius: 5px;
    top: 40px;
    height: 108px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    @keyframes dropdown {
      0% {
        transform: translateY(-10%);
      }
      100% {
        transform: translateY(0);
      }
    }
    animation: dropdown 0.5s ease;
    z-index: 8;
  `,
  Option: styled.button`
    width: 100%;
    color: ${(props) => props.theme.color.green};
    font-size: 16px;
    height: 20px;
    background-color: white;
    border: 1px solid ${(props) => props.theme.color.lightGreen};
    border-radius: 5px;
    &:hover {
      background-color: ${(props) => props.theme.color.lightGreen};
      cursor: pointer;
      color: white;
    }
    z-index: 10;
  `,
};

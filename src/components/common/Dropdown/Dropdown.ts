import styled from 'styled-components';

interface DropdownProps {
  open?: boolean;
  width?: string;
  height?: string;
}

export const S = {
  DropdownContainer: styled.div<DropdownProps>`
    position: relative;
    display: inline-block;
    border-top: 1px solid ${(props) => props.theme.color.green};
    border-left: 1px solid ${(props) => props.theme.color.green};
    border-right: 1px solid ${(props) => props.theme.color.green};
    border-bottom: ${(props) =>
      props.open ? 'none' : `1px solid ${props.theme.color.green}`};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: ${(props) => (props.open ? 'none' : '5px')};
    border-bottom-right-radius: ${(props) => (props.open ? 'none' : '5px')};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    display: flex;
    align-items: center;
    padding-left: 12px;
    background-color: #fff;
  `,
  DropdownButton: styled.button`
    background: none;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    border: none;
    z-index: 99;
  `,
  DropdownList: styled.div<DropdownProps>`
    display: flex;
    gap: 2px;
    position: absolute;
    width: 102%;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.color.green};
    font-size: 13px;
    margin-top: 15px;
    display: ${(props) => (props.open ? 'block' : 'none')};
    top: -16px;
    left: -1px;
    background-color: #fff;
    padding: 3px;
  `,
  DropdownItem: styled.div<DropdownProps>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: ${(props) => props.height};
    padding: 3px 14px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:first-child {
      margin-top: 28px;
    }
    &:hover {
      background-color: ${(props) => props.theme.color.paleGreen};
    }
  `,
  DropdownArrowDown: styled.div`
    position: absolute;
    right: 12px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${(props) => props.theme.color.green};
    margin-left: 10px;
    cursor: pointer;
  `,
  DropdownArrowUp: styled.div`
    position: absolute;
    right: 12px;
    width: 0;
    height: 0;
    z-index: 99;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${(props) => props.theme.color.green};
    margin-left: 10px;
    cursor: pointer;
  `,
};

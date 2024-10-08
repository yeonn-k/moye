import styled from 'styled-components';

interface DropdownProps {
  open: boolean;
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
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: ${(props) => (props.open ? 'none' : '10px')};
    border-bottom-right-radius: ${(props) => (props.open ? 'none' : '10px')};
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  DropdownButton: styled.button`
    background: none;
    cursor: pointer;
    border-radius: 10px;
    outline: none;
    border: none;
    z-index: 99;
  `,
  DropdownList: styled.div<DropdownProps>`
    position: absolute;
    width: 100%;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.color.green};
    font-size: 13px;
    margin-top: 15px;
    display: ${(props) => (props.open ? 'block' : 'none')};
    padding-top: 15px;
    top: -16px;
    left: -1px;
  `,
  DropdownItem: styled.div`
    margin: 20px 0;
    padding: 3px 22px;
    cursor: pointer;
  `,
  DropdownArrowDown: styled.div`
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${(props) => props.theme.color.green};
    margin-left: 10px;
    cursor: pointer;
  `,
  DropdownArrowUp: styled.div`
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

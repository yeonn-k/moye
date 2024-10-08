import styled from 'styled-components';

export const S = {
  UserInput: styled.input<{
    height?: string;
    width?: string;
  }>`
    display: flex;
    align-items: center;

    outline: none;
    padding-left: 10px;
    border: 1px solid ${(props) => props.theme.color.lightGreen};
    border-radius: 5px;
    width: ${(props) => props.width};
    height: ${(props) => (props.height ? props.height : '40px')};
  `,
};

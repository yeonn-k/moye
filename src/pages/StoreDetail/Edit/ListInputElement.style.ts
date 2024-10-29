import styled from 'styled-components';

export const L = {
  CustomInput: styled.input`
    width: 260px;
    height: 40px;
    border: 1px solid ${(props) => props.theme.color.green};
    border-radius: 5px;
    outline: none;
    padding-left: 10px;
    font-size: 16px;
    &:focus {
      box-shadow: 0 0 5px ${(props) => props.theme.color.deepGreen};
    }
  `,
};

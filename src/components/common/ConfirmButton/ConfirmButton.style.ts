import styled from 'styled-components';

export const S = {
  ConfirmButton: styled.div<{
    action: 'confirm' | 'cancel';
    width?: string;
    height?: string;
  }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${(props) => (props.width ? `${props.width}` : '98px')};
    height: ${(props) => (props.height ? `${props.height}` : '40px')};
    border-radius: 5px;
    background-color: ${(props) =>
      props.action === 'confirm'
        ? props.theme.color.green
        : props.theme.color.deepGreen};
    color: white;

    &:hover {
      cursor: pointer;
    }
  `,
};

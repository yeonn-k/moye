import styled from 'styled-components';

export const S = {
  ModalContainer: styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.color.gray};
    opacity: 0.8;
  `,
};

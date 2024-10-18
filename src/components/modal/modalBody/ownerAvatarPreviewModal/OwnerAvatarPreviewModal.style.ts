import styled from 'styled-components';

export const S = {
  ModalBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 600px;
    height: 480px;
    background-color: #fff;
    border-radius: 10px;
    padding: 15px 15px;
    position: relative;
  `,
  ModalCloseButton: styled.button`
    align-self: flex-end;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 26px;
  `,
  ModalText: styled.h2`
    font-size: 18px;
    position: absolute;
    top: 48px;
    font-weight: 600;
  `,
  ImageSelectButton: styled.div`
    width: 230px;
    height: 40px;
    background-color: ${(props) => props.theme.color.paleNavy};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 5px;
    position: absolute;
    bottom: 85px;
    &:hover {
      cursor: pointer;
    }
  `,
  ImagePreviewBox: styled.div`
    width: 230px;
    height: 220px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  ModalButtonGroup: styled.div`
    display: flex;
    gap: 37px;
    padding: 15px;
  `,
  SubmitButton: styled.button`
    all: unset;
    width: 98px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: ${(props) => props.theme.color.green};
    color: #fff;
    &:hover {
      cursor: pointer;
    }
  `,
  CancelButton: styled.button`
    all: unset;
    width: 98px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: ${(props) => props.theme.color.deepGreen};
    color: #fff;
    &:hover {
      cursor: pointer;
    }
  `,
};

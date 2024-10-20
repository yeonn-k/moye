import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const RSD = {
  EditStoreDetail: styled.div`
    height: 100%;
    max-width: 1080px;
    margin: 0 auto;
    font-size: 20px;
  `,
  TopBar: styled.div`
    font-size: 28px;
    font-weight: bold;
    color: ${(props) => props.theme.color.green};
    text-align: center;
    padding: 8px 12px;
    margin: 20px;
  `,
  Body: styled.div`
    display: flex;
    padding: 8px 12px;
    li {
      padding: 4px 8px;
      margin: 0px 8px 16px 8px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        width: 40%;
      }
      div {
        margin-left: auto;
      }
    }
  `,
  BodyLeft: styled.div`
    padding: 8px 12px;
    width: 50%;
  `,
  BodyRight: styled.div`
    padding: 8px 12px;
    width: 50%;
    li span {
      width: 25%;
    }
    li div label {
      cursor: pointer;
      input {
        display: none;
      }
      span {
        text-align: center;
        width: 36px;
        height: 36px;
        position: relative;
        display: inline-block;
        background: white;
        margin: 8px 6px;
        padding: 8px 0;
        color: ${(props) => props.theme.color.green};
        border: 1px solid ${(props) => props.theme.color.green};
        border-radius: 10px;
        font-size: 16px;
        transition: 0.5s;
        user-select: none;
        overflow: hidden;
      }
      span:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: white;
      }
      input:checked ~ span {
        color: white;
        background: ${(props) => props.theme.color.darkGreen};
      }
    }
  `,
  DateAddButton: styled.button`
    padding: 8px 12px;
    border: 2px solid ${(props) => props.theme.color.green};
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
  `,
  ConfirmBar: styled.div`
    text-align: center;
    button {
      margin: 10px 20px;
      background: white;
      border: 3px solid ${(props) => props.theme.color.green};
      border-radius: 5px;
      width: 60px;
      height: 40px;
      cursor: pointer;
    }
  `,
  CancleButton: styled.button`
    &&& {
      border: 3px solid ${(props) => props.theme.color.coral};
    }
  `,
  TimeInput: styled.input`
    width: 50px;
    text-align: center;
  `,
  ImageUploadBox: styled.label`
    width: 100%;
    height: 400px;
    margin: auto;
    border-radius: 5px;
    border: 3px dashed #eee;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      border-color: ${(props) => props.theme.color.navy};
    }
    input {
      display: none;
    }
    input::file-selector-button {
      font-size: 13px;
      border: 1px solid black;
      border-radius: 10px;
      padding: 4px 32px;
      cursor: pointer;
    }
    p {
      margin: 10px;
      font-size: 13px;
      color: gray;
    }
  `,
  CustomTextarea: styled.textarea`
    width: 260px;
    height: 80px;
    border: 1px solid ${(props) => props.theme.color.green};
    border-radius: 5px;
    outline: none;
    padding: 8px;
    resize: none;
    &:focus {
      box-shadow: 0 0 5px ${(props) => props.theme.color.deepGreen};
    }
  `,
  CustomImgPreview: styled.img<{ uploaded: boolean }>`
    width: ${(props) => (props.uploaded ? '100%' : '200px')};
    height: ${(props) => (props.uploaded ? '100%' : '100px')};
    border: none;
    object-fit: contain;
  `,
  ErrorMessage: styled.p<{ visible?: boolean }>`
    color: ${(props) => props.theme.color.coral};
    text-align: right;
    font-size: 11px;
    margin: 0px 16px;
    opacity: 0;
    animation: ${fadeIn} 0.3s ease forwards;
    opacity: 1;
    display: none;
    &.visible {
      display: block;
    }
  `,
};

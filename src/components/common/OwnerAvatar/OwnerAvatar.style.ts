import { styled } from 'styled-components';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import { Link } from 'react-router-dom';

interface AvatarProps {
  width: string;
  height: string;
  $avatarUrl: string | null;
}

export const S = {
  AvatarBox: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100%;
  `,
  Avatar: styled(Link)<AvatarProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: 50%;
    background-image: ${(props) =>
      props.$avatarUrl ? `url(${props.$avatarUrl})` : `url(${defaultAvatar})`};
    background-size: cover;
    background-position: center;
    position: relative;
    cursor: pointer;
    &:hover {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(128, 128, 128, 0.2);
        border-radius: 50%;
      }
    }
  `,
};

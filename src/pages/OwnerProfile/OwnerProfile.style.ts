import styled from 'styled-components';
import defaultAvatar from '../../assets/images/defaultAvatar.png';

interface OwnerProfileProps {
  color: string;
}

export const S = {
  OwnerProfileBox: styled.div`
    max-width: 1440px;
    height: 100%;
    padding: 20px;
    margin: 0 auto;
  `,
  ProfileSection: styled.div`
    width: 100%;
    height: 390px;
    display: flex;
    padding: 20px;
  `,
  AvatarArea: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100%;
  `,
  DefaultAvatar: styled.div`
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background-image: url(${defaultAvatar});
    background-size: cover;
    background-position: center;
  `,
  AvatarSelectButton: styled.button`
    all: unset;
    cursor: pointer;
    color: ${(props) => props.theme.color.green};
    font-weight: 600;
  `,
  OwnerInfoArea: styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    gap: 50px;
    height: 100%;
    padding-bottom: 40px;
  `,
  OwnerInfoLabeBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
  `,
  OwnerInfoLabel: styled.label`
    font-size: 16px;
    display: flex;
    gap: 20px;
    align-items: center;
    width: 100px;
  `,
  OwnerInfoValueBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
  `,
  OwnerInfoValue: styled.span`
    font-size: 16px;
    font-weight: 600;
  `,
  Divider: styled.div`
    width: 100%;
    border: 1px solid #d9d9d9;
    margin: 20px 0;
  `,
  MyStoreSection: styled.div`
    width: 100%;
    padding: 20px;
  `,
  MyStoreTitle: styled.h2`
    font-size: 16px;
    font-weight: 600;
  `,
  MyStoreList: styled.ul`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px 0;
  `,
  MyStoreItem: styled.li<OwnerProfileProps>`
    width: 280px;
    height: 280px;
    background-color: ${(props) => props.color};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    position: relative;
    &:hover {
      &:before {
        outline: none;
        border-radius: 10px;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(128, 128, 128, 0.2);
        pointer-events: none;
      }
    }
  `,
};

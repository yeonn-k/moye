import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    background-color: ${(props) => props.theme.color.gray};
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
  AddMyStoreLink: styled(Link)`
    width: 280px;
    height: 280px;
    background-color: #d9d9d9;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    text-decoration: none;
    color: #000;
    cursor: pointer;
  `,
};

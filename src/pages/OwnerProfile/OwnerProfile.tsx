import React from 'react';
import { S } from './OwnerProfile';

const OwnerProfile = () => {
  return (
    <S.OwnerProfileBox>
      <S.ProfileSection>
        <S.AvatarArea>
          <S.DefaultAvatar />
          <S.AvatarSelectButton>프로필 변경</S.AvatarSelectButton>
        </S.AvatarArea>
        <S.OwnerInfoArea>
          <S.OwnerInfoLabeBox>
            <S.OwnerInfoLabel>이름</S.OwnerInfoLabel>
            <S.OwnerInfoLabel>이메일</S.OwnerInfoLabel>
            <S.OwnerInfoLabel>전화번호</S.OwnerInfoLabel>
          </S.OwnerInfoLabeBox>
          <S.OwnerInfoValueBox>
            <S.OwnerInfoValue>사장님</S.OwnerInfoValue>
            <S.OwnerInfoValue>qwer@gooogle.com</S.OwnerInfoValue>
            <S.OwnerInfoValue>010-0000-0000</S.OwnerInfoValue>
          </S.OwnerInfoValueBox>
        </S.OwnerInfoArea>
      </S.ProfileSection>
      <S.Divider />
      <S.MyStoreSection>
        <S.MyStoreTitle>나의 가게</S.MyStoreTitle>
        <S.MyStoreList>
          <S.AddMyStoreLink to="/#">+ 매장 등록</S.AddMyStoreLink>
        </S.MyStoreList>
      </S.MyStoreSection>
    </S.OwnerProfileBox>
  );
};

export default OwnerProfile;

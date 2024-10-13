import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfileAction } from '../../store/slices/auth/authSlice';
import { S } from './OwnerProfile';
import { RootState } from '../../store/store';
import { getUserByEmailService } from '../../services/auth/authService';
import { formatPhoneNumber } from '../../utils/format/formaPhoneNumber';

const OwnerProfile = () => {
  const loginUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loginUser || !loginUser.email) return;
    const fetchUserByEmail = async () => {
      try {
        const result = await getUserByEmailService({ email: loginUser.email });
        if (result?.body) {
          const { name, phone } = result.body;
          if (name !== loginUser.name || phone !== loginUser.phone) {
            dispatch(updateUserProfileAction({ name, phone }));
          }
        }
      } catch (e) {
        console.error('유저 조회 에러: ', e);
      }
    };
    fetchUserByEmail();
  }, [loginUser, dispatch]);

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
            <S.OwnerInfoValue>{loginUser?.name || ''}</S.OwnerInfoValue>
            <S.OwnerInfoValue>{loginUser?.email || ''}</S.OwnerInfoValue>
            <S.OwnerInfoValue>
              {formatPhoneNumber(loginUser?.phone || '')}
            </S.OwnerInfoValue>
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

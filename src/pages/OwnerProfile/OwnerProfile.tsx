import { Store } from '../../store/slices/auth/authSlice';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setIsStoreSelected,
  updateUserProfileAction,
  setStore,
  setStoreReset,
} from '../../store/slices/auth/authSlice';
import { S } from './OwnerProfile.style';
import { RootState } from '../../store/store';
import {
  getUserByEmailService,
  getStoresByIdService,
} from '../../services/auth/authService';
import { formatPhoneNumber } from '../../utils/formatter';
import OwnerAvatar from '../../components/common/OwnerAvatar/OwnerAvatar.tsx';
import ROUTE_LINK from '../../routes/RouterLink.ts';
import { APIS } from '../../config/config.ts';

const OwnerProfile = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const loginUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const avatarInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const fetchStoresById = async () => {
      if (!loginUser) return;
      try {
        const result = await getStoresByIdService({ userId: loginUser.id });
        if (!result) return;
        setStores(result);
      } catch (e) {
        console.error('가게 조회 에러: ', e);
      }
    };
    fetchStoresById();
  }, [loginUser, dispatch]);

  useEffect(() => {
    const resetStoreSelected = () => {
      dispatch(setIsStoreSelected(true));
      dispatch(setStoreReset());
    };
    resetStoreSelected();
  }, [dispatch]);

  const handleStoreClick = (businessName: string, id: number) => {
    dispatch(setIsStoreSelected(true));
    dispatch(setStore({ businessName, id }));
  };

  const handleSelectAvatar = () => {
    // if (avatarInputRef.current) {
    //   avatarInputRef.current.click();
    // }
  };

  return (
    <S.OwnerProfileBox>
      <S.ProfileSection>
        <S.AvatarArea>
          <OwnerAvatar $avatarUrl={loginUser?.avatarUrl} />
          {/* TODO: 프로필 변경 로직 추가 필요 */}
          <input accept="img/*" type="file" hidden ref={avatarInputRef} />
          <S.AvatarSelectButton onClick={handleSelectAvatar}>
            프로필 변경
          </S.AvatarSelectButton>
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
          {stores.length > 0 && (
            <>
              {stores.map((store) => (
                <S.MyStoreItem key={store.id}>
                  <Link
                    to={`${ROUTE_LINK.TODAY.link}/${store.id}`}
                    onClick={() =>
                      handleStoreClick(store.businessName, store.id)
                    }
                  >
                    {store.businessName}
                  </Link>
                </S.MyStoreItem>
              ))}
            </>
          )}
          <S.MyStoreItem>
            {/* TODO: 매장 추가 페이지로 링크 연결하기 */}
            <Link to={APIS.store}>+ 매장 추가</Link>
          </S.MyStoreItem>
        </S.MyStoreList>
      </S.MyStoreSection>
    </S.OwnerProfileBox>
  );
};

export default OwnerProfile;

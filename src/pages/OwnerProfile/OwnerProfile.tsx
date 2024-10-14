import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserProfileAction } from '../../store/slices/auth/authSlice';
import { S } from './OwnerProfile';
import { RootState } from '../../store/store';
import {
  getUserByEmailService,
  getStoresByIdService,
} from '../../services/auth/authService';
import { formatPhoneNumber } from '../../utils/format/formaPhoneNumber';

// TODO: interface 외부 파일로 관리 필요
interface Store {
  address: string;
  businessName: string;
  businessRegistrationNumber: string;
  contact: string;
  id: number;
  name: string;
  registerDate: string;
  registerUser: string;
  seatCount: number;
  tableCount: number;
  updateDate: string;
  updateUser: string;
}

const OwnerProfile = () => {
  const [stores, setStores] = useState<Store[]>([]);
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
          {stores.length > 0 && (
            <>
              {stores.map((store) => (
                <S.MyStoreItem key={store.id}>
                  <Link to={`/today?storeId=${store.id}`}>
                    {store.businessName}
                  </Link>
                </S.MyStoreItem>
              ))}
            </>
          )}
          <S.AddMyStoreLink to="/owner">+ 매장 등록</S.AddMyStoreLink>
        </S.MyStoreList>
      </S.MyStoreSection>
    </S.OwnerProfileBox>
  );
};

export default OwnerProfile;

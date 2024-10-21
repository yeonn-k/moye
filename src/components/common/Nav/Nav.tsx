import { Link, useNavigate } from 'react-router-dom';
import { N } from './Nav.style';
import { useSelector, useDispatch } from 'react-redux';
import ROUTE_LINK from '../../../routes/RouterLink';
import { RootState } from '../../../store/store';
import { logoutAction } from '../../../store/slices/auth/authSlice';
import OwnerAvatar from '../OwnerAvatar/OwnerAvatar';
import { APIS } from '../../../config/config';
import axios from 'axios';

const Nav = () => {
  const storeId = useSelector((state: RootState) => {
    if (state.auth.store === null) {
      return 0;
    }
    return state.auth.store.id;
  });
  const loginUser = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    async function logout() {
      await axios
        .post(`${APIS.logout}`)
        .then((res) => alert('로그아웃되었습니다.'))
        .catch((error) => {
          console.log('Error: ', error);
          alert('로그아웃에 실패했습니다.');
        });
    }
    logout();
    dispatch(logoutAction());
    navigate('/');
  };

  return (
    <N.NavBar $storeId={storeId}>
      <div>
        <Link to={ROUTE_LINK.OWNER.link}>
          <N.NavLogo />
        </Link>
      </div>
      {storeId > 0 && (
        <N.NavMenuList>
          <N.NavMenuLink to={`${ROUTE_LINK.TODAY.link}/${storeId}`}>
            <N.NavMenuItem>Today</N.NavMenuItem>
          </N.NavMenuLink>
          <N.NavMenuLink to={`${ROUTE_LINK.MONTH.link}/${storeId}`}>
            <N.NavMenuItem>Month</N.NavMenuItem>
          </N.NavMenuLink>
          <N.NavMenuLink to={`${ROUTE_LINK.STORE.link}/${storeId}`}>
            <N.NavMenuItem>Store</N.NavMenuItem>
          </N.NavMenuLink>
        </N.NavMenuList>
      )}
      <N.UserMenuList>
        <N.UserMenuItem>
          <OwnerAvatar
            $avatarUrl={loginUser?.avatarUrl || ''}
            width="35px"
            height="35px"
          />
        </N.UserMenuItem>
        <N.UserMenuItem>
          <N.LogoutButton onClick={handleLogoutClick}>로그아웃</N.LogoutButton>
        </N.UserMenuItem>
      </N.UserMenuList>
    </N.NavBar>
  );
};

export default Nav;

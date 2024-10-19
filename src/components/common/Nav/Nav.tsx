import { Link, useNavigate } from 'react-router-dom';
import { N } from './Nav.style';
import { useSelector, useDispatch } from 'react-redux';
import ROUTE_LINK from '../../../routes/RouterLink';
import { RootState } from '../../../store/store';
import { logoutAction } from '../../../store/slices/auth/authSlice';
import OwnerAvatar from '../OwnerAvatar/OwnerAvatar';
import Logo from '../../../assets/images/logo.png';

const Nav = () => {
  const storeId = useSelector((state: RootState) => {
    if (state.auth.store === null) {
      return 0;
    }
    return state.auth.store.id;
  });
  const avatarUrl = useSelector(
    (state: RootState) => state.auth.user?.avatarUrl ?? null,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
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
          <N.NavMenuItem>
            <N.NavMenuLink to={`${ROUTE_LINK.TODAY.link}/${storeId}`}>
              Today
            </N.NavMenuLink>
          </N.NavMenuItem>
          <N.NavMenuItem>
            <N.NavMenuLink to={`${ROUTE_LINK.MONTH.link}/${storeId}`}>
              Month
            </N.NavMenuLink>
          </N.NavMenuItem>
          <N.NavMenuItem>
            <N.NavMenuLink to={`${ROUTE_LINK.STORE.link}/${storeId}`}>
              Store
            </N.NavMenuLink>
          </N.NavMenuItem>
        </N.NavMenuList>
      )}
      <N.UserMenuList>
        <N.UserMenuItem>
          <OwnerAvatar $avatarUrl={avatarUrl} width="35px" height="35px" />
        </N.UserMenuItem>
        <N.UserMenuItem>
          <N.LogoutButton onClick={handleLogoutClick}>로그아웃</N.LogoutButton>
        </N.UserMenuItem>
      </N.UserMenuList>
    </N.NavBar>
  );
};

export default Nav;

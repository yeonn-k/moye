import { Link, useNavigate } from 'react-router-dom';
import { N } from './Nav.style';
import { useSelector, useDispatch } from 'react-redux';
import ROUTE_LINK from '../../../routes/RouterLink';
import { RootState } from '../../../store/store';
import { logoutAction } from '../../../store/slices/auth/authSlice';
import OwnerAvatar from '../OwnerAvatar/OwnerAvatar';

const Nav = () => {
  const isStoreSelected = useSelector(
    (state: RootState) => state.auth.isStoreSelected,
  );
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
    <N.NavBar>
      <div>
        <Link to={ROUTE_LINK.OWNER.link}>
          <img className="nav_logo" src="프로젝트로고url" alt="navLogo" />
        </Link>
      </div>
      {isStoreSelected && (
        <N.NavMenu>
          <li>
            <Link to={ROUTE_LINK.TODAY.link}>Today</Link>
          </li>
          <li>
            <Link to={ROUTE_LINK.MONTH.link}>Month</Link>
          </li>
          <li>
            <Link to={ROUTE_LINK.STORE.link}>Store</Link>
          </li>
        </N.NavMenu>
      )}
      <N.UserMenu>
        <OwnerAvatar $avatarUrl={avatarUrl} width="35px" height="35px" />
        <button onClick={handleLogoutClick}>로그아웃</button>
      </N.UserMenu>
    </N.NavBar>
  );
};

export default Nav;

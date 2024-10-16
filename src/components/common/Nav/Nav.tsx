import { Link, useNavigate } from 'react-router-dom';
import { N } from './Nav.style';
import { useSelector, useDispatch } from 'react-redux';
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
        <Link to="/owner">
          <img className="nav_logo" src="프로젝트로고url" alt="navLogo" />
        </Link>
      </div>
      {isStoreSelected && (
        <N.NavMenu>
          <li>
            <Link to="/today">today</Link>
          </li>
          <li>
            <Link to="/month">month</Link>
          </li>
          <li>
            <Link to="/store">Store</Link>
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

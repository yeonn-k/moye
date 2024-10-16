import { Link, useNavigate } from 'react-router-dom';
import { N } from './Nav';
import { useSelector, useDispatch } from 'react-redux';
import ROUTE_LINK from '../../../routes/RouterLink';
import { RootState } from '../../../store/store';
import { logoutAction } from '../../../store/slices/auth/authSlice';

const Nav = () => {
  const isStoreSelected = useSelector(
    (state: RootState) => state.auth.isStoreSelected,
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
        <img
          className="nav_profile"
          src="유저프로필이미지url"
          alt="navProfile"
        />
        <button onClick={handleLogoutClick}>로그아웃</button>
      </N.UserMenu>
    </N.NavBar>
  );
};

export default Nav;

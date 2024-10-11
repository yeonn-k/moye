import { Link } from 'react-router-dom';
import { N } from './Nav';

const Nav = () => {
  const handleLogoutClick = () => {
    // TODO: 백엔드 연결 후 로그아웃 로직 작성
    console.log('run: logout');
  };

  return (
    <N.NavBar>
      <div>
        <img className="nav_logo" src="프로젝트로고url" alt="navLogo"></img>
      </div>
      <N.NavMenu>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/list">List</Link>
        </li>
        <li>
          <Link to="/store">Store</Link>
        </li>
      </N.NavMenu>
      <N.UserMenu>
        <img
          className="nav_profile"
          src="유저프로필이미지url"
          alt="navProfile"
        ></img>
        <button onClick={handleLogoutClick}>로그아웃</button>
      </N.UserMenu>
    </N.NavBar>
  );
};

export default Nav;

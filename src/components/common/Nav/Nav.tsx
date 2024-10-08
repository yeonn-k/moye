import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const N = {
  NavBar: styled.div`
    height: 80px;
  `
}

const Nav = () => {
  const handleLogoutClick = () => {
    // TODO: 백엔드 연결 후 로그아웃 로직 작성
    console.log('run: logout')
  }

  return (
    <N.NavBar>
      <img className='ProjectLogo' src='프로젝트로고url' alt='projectLogo'></img>
      <div className='Dashboard'><Link to='/dashboard'>Dashboard</Link></div>
      <div className='List'><Link to='/list'>List</Link></div>
      <div className='Store'><Link to='/store'>Store</Link></div>
      <img className='UserProfileImg' src='유저프로필이미지url' alt='userProfileImg'></img>
      <button className='LogoutButton' onClick={handleLogoutClick}>로그아웃</button>
    </N.NavBar>
  )
}

export default Nav;
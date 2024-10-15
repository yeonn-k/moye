import { Outlet } from 'react-router-dom';
import Nav from '../Nav/Nav.tsx';

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Layout;

import UserInput from './common/UserInput/UserInput.tsx';
import Nav from './common/Nav/Nav.tsx';
import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <div>
      <Nav></Nav>Hello, World!
      <Outlet />
    </div>
  );
}

export default Main;

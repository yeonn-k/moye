import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ROUTE_LINK from '../RouterLink';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // TODO: 토큰 삭제 예정으로 isAuth는 그 자체를 스토어에 저장하는 것으로 변경 예정
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTE_LINK.LOGIN.link} replace />
  );
};

export default ProtectedRoute;

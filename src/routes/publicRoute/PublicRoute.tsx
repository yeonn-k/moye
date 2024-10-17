import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ROUTE_LINK from '../RouterLink';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  // TODO: 토큰 삭제 예정으로 isAuth는 그 자체를 스토어에 저장하는 것으로 변경 예정
  const isAuth = useSelector((state: RootState) => state.auth.token !== null);

  return !isAuth ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTE_LINK.OWNER.link} replace />
  );
};

export default PublicRoute;

import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuth = useSelector((state: RootState) => state.auth.token !== null);

  return !isAuth ? <>{children}</> : <Navigate to={`/owner`} replace />;
};

export default PublicRoute;

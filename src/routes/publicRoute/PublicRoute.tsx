import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ROUTE_LINK from '../RouterLink';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return !isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTE_LINK.OWNER.link} replace />
  );
};

export default PublicRoute;

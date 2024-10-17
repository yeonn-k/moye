import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ROUTE_LINK from '../RouterLink';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTE_LINK.LOGIN.link} replace />
  );
};

export default ProtectedRoute;

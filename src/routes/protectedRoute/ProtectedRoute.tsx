import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useSelector((state: RootState) => state.auth.token !== null);

  return isAuth ? <>{children}</> : <Navigate to={`/login`} />;
};

export default ProtectedRoute;

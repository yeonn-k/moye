import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logoutAction } from '../../store/slices/auth/authSlice';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useSelector((state: RootState) => state.auth.token !== null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      dispatch(logoutAction());
    }
  }, [isAuth, dispatch]);

  if (!isAuth) {
    return <Navigate to={`/login`} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

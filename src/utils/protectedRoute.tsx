import { RootState, useSelector } from '../services/store';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuth = useSelector((store: RootState) => store.user.isAuth);

  if (isAuth && onlyUnAuth) {
    return <Navigate replace to='/profile' />;
  }

  if (!isAuth && !onlyUnAuth) {
    return <Navigate replace to='/login' />;
  }

  return children;
};

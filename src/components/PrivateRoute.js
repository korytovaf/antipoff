import { Navigate } from 'react-router-dom';
import { routesConst } from '../config/consts';
import { useAuth } from '../hooks/useAuth';

export const PrivateRoute = ({ children }) => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return children;
  }

  return <Navigate to={routesConst.HOME} />;
};

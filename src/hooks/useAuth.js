import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { token } = useSelector(store => store.auth);

  return {
    isAuth: !!token,
    token,
  };
};

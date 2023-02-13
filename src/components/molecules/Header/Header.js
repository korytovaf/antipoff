import styles from './Header.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logout } from '../../atoms/icons/Logout';
import { Arrow } from '../../atoms/icons/Arrow';
import { useActions } from '../../../hooks/useActions';

export const Header = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLogout } = useActions();

  const goBackPage = () => {
    navigate(-1);
  };


  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_btn_wrap}>

          {location.pathname !== '/catalog' && (
            <button
              type="button"
              onClick={goBackPage}
              className={`${styles.header_btn} ${styles.header_btn_back}`}
            >
              <span>Назад</span>
              <Arrow />
            </button>
          )}

          <button onClick={setLogout} className={`${styles.header_btn} ${styles.header_btn_auth}`}>
            <span>Выход</span>
            <Logout />
          </button>

        </div>
        {children}
      </div>
    </header>
  );
};

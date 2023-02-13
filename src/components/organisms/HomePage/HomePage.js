import { FormsAuth } from '../../molecules/FormsAuth/FormsAuth';
import styles from './HomePage.module.scss';

export const HomePage = () => {

  return (
    <div className={styles.home_container}>
      <FormsAuth />
    </div>
  );
};

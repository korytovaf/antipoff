import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.spinner_wrap}>
      <div className={styles.spinner}></div>
    </div>
  );
};

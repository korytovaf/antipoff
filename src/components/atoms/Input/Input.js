import styles from './Input.module.scss';

export const Input = ({ register, name, label, validate, error, buttonIcon, buttonClick, type = 'text' }) => {

  const onClickBtn = (e) => {
    e.stopPropagation();
    buttonClick();
  };

  return (
    <div className={styles.input_wrapper}>
      <label className={styles.input_label}>{label}</label>
      <input type={type} className={styles.input} {...register(name, validate)}/>
      {buttonIcon && <button type="button" onClick={onClickBtn} className={styles.input_icon_btn}>{buttonIcon}</button>}
      <span className={styles.input_error}>{error}</span>
    </div>
  );
};

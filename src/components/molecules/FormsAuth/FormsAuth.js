import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchRegister, fetchLogin } from '../../../store/slice/authSlice';
import { Input } from '../../atoms/Input/Input';
import styles from './FormsAuth.module.scss';
import { emailRegexp } from '../../../helpers/regexp';
import { Eye } from '../../atoms/icons/Eye';
import { EyeClosed } from '../../atoms/icons/EyeClosed';
import { useNavigate } from 'react-router-dom';


export const FormsAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: errorApi, status } = useSelector(store => store.auth);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({ mode: 'onBlur' });

  const onSingUp = async (data) => {
    const { confirm, ...rest } = data;
    if (!isLogin) await dispatch(fetchRegister(rest));
    if (isLogin) await dispatch(fetchLogin(rest));
    if (status === 'resolve') {
      reset();
      navigate('/catalog');
    }
  };

  const onCheckedLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <form
      onSubmit={handleSubmit(onSingUp)}
      className={styles.form_auth_wrapper}
    >
      <h1 className={styles.form_auth_title}>
        <span>{!isLogin ? 'Регистрация' : 'Авторизация'}</span>
        <button type="button" className={styles.form_auth_title_btn} onClick={onCheckedLogin}>
          {isLogin ? 'Нет аккаунта' : 'Уже есть аккаунт'}
        </button>
      </h1>

      <Input
        label="Электронная почта"
        name="email"
        register={register}
        error={errors?.email && errors?.email.message}
        validate={{
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: emailRegexp,
            message: 'Не является электронной почтой',
          },
        }}
      />

      <Input
        label="Пароль"
        name="password"
        register={register}
        error={errors?.password && errors?.password.message}
        validate={{
          required: 'Поле обязательно для заполнения',
          minLength: { value: 5, message: 'Минимум 5 символов' },
        }}
        type={isVisiblePassword ? 'text' : 'password'}
        buttonIcon={isVisiblePassword ? <Eye /> : <EyeClosed />}
        buttonClick={() => setIsVisiblePassword(!isVisiblePassword)}
      />

      {!isLogin && (
        <Input
          label="Подтвердите пароль"
          name="confirm"
          register={register}
          error={errors?.confirm && errors?.confirm.message}
          validate={{
            required: 'Поле обязательно для заполнения',
            validate: value => value === getValues('password') || 'Пароли не совпадают',
          }}
          type={isVisibleConfirm ? 'text' : 'password'}
          buttonIcon={isVisibleConfirm ? <Eye /> : <EyeClosed />}
          buttonClick={() => setIsVisibleConfirm(!isVisibleConfirm)}
        />
      )}

      {errorApi && status === 'reject' && (<div className={styles.form_auth_error}>{errorApi}</div>)}

      <button
        type="submit"
        className={styles.form_auth_btn}
      >
        {!isLogin ? 'Зарегистрироваться' : 'Войти'}
      </button>
    </form>
  );
};

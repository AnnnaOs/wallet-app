import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUserThunk } from '../../redux/auth/operations';
import { selectIsAuthError } from '../../redux/auth/selectors';
import PasswordStrengthBar from 'react-password-strength-bar'; 
import logo from '../../images/logo-mob.svg';
import IconSvg from '../../components/IconSvg/IconSvg';
import styles from './RegistrationForm.module.css';


const RegistrationForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectIsAuthError);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = data => {
    setHasTriedSubmit(true);
    const { name, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    dispatch(registerUserThunk({ name, email, password }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        
          <img src={logo} alt="Wallet Logo" width="26" height="26" className={styles.logoIcon} />
          <h2 className={styles.title}>Money Guard</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputBox}>
              <div className={styles.inputContainer}>
              <IconSvg
                className={styles.inputIcon}
                width={24}
                height={24}
                name="user"
              />
              <input
                type="text"
                placeholder="Name"
                {...register('name', { required: true })}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              />
              </div>
              {errors.name && <p className={styles.errorText}>This field is required</p>}
            </div>

            <div className={styles.inputBox}>
            <div className={styles.inputContainer}>
              <IconSvg
                className={styles.inputIcon}
                width={24}
                height={24}
                name=""
              /> 
              <input
                type="email"
                placeholder="E-mail"
                {...register('email', { required: true })}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            />
            </div>
              {errors.email && <p className={styles.errorText}>This field is required</p>}
            </div>

            <div className={styles.inputBox}>
            <div className={styles.inputContainer}>
              <IconSvg
                className={styles.inputIcon}
                width={24}
                height={24}
                name=""
              />
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              />
              </div>
              {errors.password && <p className={styles.errorText}>This field is required</p>}
            </div>

            <div className={styles.inputBox}>
            <div className={styles.inputContainer}>
              <IconSvg
                className={styles.inputIcon}
                width={24}
                height={24}
                name=""
              /> 
              <input
                type="password"
                placeholder="Confirm password"
                {...register('confirmPassword', { required: true })}
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              />
              </div>
              {errors.confirmPassword && <p className={styles.errorText}>This field is required</p>}
            </div>
          

          <div className={styles.strengthBarBox}>
            <PasswordStrengthBar
              className={styles.strengthBar}
              password={watch('confirmPassword')}
              barColors={['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']}
              scoreWords={['weak', 'weak', 'okay', 'good', 'strong']}
              shortScoreWord=""
              minLength={6}
              scoreWordStyle={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)', margin: '0' }}
              scoreWordClassName="strength-score"
            />
          </div>

          <div className={styles.btnBox}>
  <button
    type="submit"
    disabled={hasTriedSubmit && !isValid}
    className={`${styles.oneBtn} ${styles.multiColorButton}`}
  >
    Register
  </button>
  <Link to="/login">
    <button
      type="button"
      className={`${styles.oneBtn} ${styles.whiteButton}`}
    >
      Log in
    </button>
  </Link>
</div>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
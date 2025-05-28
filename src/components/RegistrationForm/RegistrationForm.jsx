import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUserThunk } from '../../redux/auth/operations';
import { selectIsAuthError } from '../../redux/auth/selectors';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import logo from '../../images/logo.svg';
import IconSvg from '../../components/IconSvg/IconSvg';
import { useTogglePassword } from '../../hooks/useTogglePassword';
import styles from './RegistrationForm.module.css';
import { toast } from 'react-toastify';

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

  const { visible: showPassword, toggle: togglePassword } = useTogglePassword();
  const { visible: showConfirmPassword, toggle: toggleConfirmPassword } = useTogglePassword();

  const onSubmit = async data => {
    setHasTriedSubmit(true);
    const { name, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const resultAction = await dispatch(registerUserThunk({ name, email, password }));

      if (registerUserThunk.fulfilled.match(resultAction)) {
        toast.success('Registration successful!');
      } else {
        throw new Error(resultAction.payload || 'Registration failed');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <img src={logo} alt="Wallet Logo" className={styles.logoIcon} />
        <h2 className={styles.title}>Money Guard</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputBox}>
            <div className={styles.inputContainer}>
              <IconSvg className={styles.inputIcon} width={24} height={24} name="icon-user" />
              <input type="text" placeholder="Name" {...register('name', { required: true })} className={`${styles.input} ${errors.name ? styles.inputError : ''}`} />
            </div>
            {errors.name && <p className={styles.errorText}>This field is required</p>}
          </div>

          <div className={styles.inputBox}>
            <div className={styles.inputContainer}>
              <IconSvg className={styles.inputIcon} width={24} height={24} name="icon-email" />
              <input type="email" placeholder="E-mail" {...register('email', { required: true })} className={`${styles.input} ${errors.email ? styles.inputError : ''}`} />
            </div>
            {errors.email && <p className={styles.errorText}>This field is required</p>}
          </div>

          <div className={styles.inputBox}>
            <div className={styles.inputContainer}>
              <IconSvg className={styles.inputIcon} width={24} height={24} name="icon-lock" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', { required: true })}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              />
              <button type="button" className={styles.eyeButton} onClick={togglePassword}>
                <IconSvg width={18} height={18} name={showPassword ? 'icon-eye' : 'icon-eye-blocked'} />
              </button>
            </div>
            {errors.password && <p className={styles.errorText}>This field is required</p>}
          </div>

          <div className={styles.inputBox}>
            <div className={styles.inputContainer}>
              <IconSvg className={styles.inputIcon} width={24} height={24} name="icon-lock" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                {...register('confirmPassword', { required: true })}
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              />
              <button type="button" className={styles.eyeButton} onClick={toggleConfirmPassword}>
                <IconSvg width={18} height={18} name={showConfirmPassword ? 'icon-eye' : 'icon-eye-blocked'} />
              </button>
            </div>
            {errors.confirmPassword && <p className={styles.errorText}>This field is required</p>}
            <ProgressBar watch={watch} />
          </div>
          <div className={styles.btnBox}>
            <button type="submit" disabled={hasTriedSubmit && !isValid} className={`${styles.oneBtn} ${styles.multiColorButton}`}>
              Register
            </button>
            <Link to="/login">
              <button type="button" className={`${styles.oneBtn} ${styles.whiteButton}`}>
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

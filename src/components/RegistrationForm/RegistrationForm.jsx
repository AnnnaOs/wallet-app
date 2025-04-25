import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUserThunk } from '../../redux/auth/operations';
import { selectIsAuthError } from '../../redux/auth/selectors';
import PasswordStrengthBar from 'react-password-strength-bar';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; 
import styles from './RegistrationForm.module.css';
import modalstyles from '../../pages/RegistrationPage/RegistrationPage.module.css';

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
      <div className={modalstyles.modal}>
        <div className={modalstyles.logoBox}>
          <img src="../../images/logo.svg" alt="Logo" width="26" height="26" className={styles.logoIcon} />
          <h2 className={modalstyles.title}>Money Guard</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={modalstyles.form}>
          <div className={modalstyles.input}>
            <div className={modalstyles.inputBox}>
              <div className={modalstyles.inputIcon}>
                <FaUser /> {}
              </div>
              <input
                type="text"
                placeholder="Name"
                {...register('name', { required: true })}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              />
              {errors.name && <p className={styles.errorText}>This field is required</p>}
            </div>

            <div className={modalstyles.inputWrapper}>
              <div className={modalstyles.iconWrapper}>
                <FaEnvelope /> {}
              </div>
              <input
                type="email"
                placeholder="E-mail"
                {...register('email', { required: true })}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              />
              {errors.email && <p className={styles.errorText}>This field is required</p>}
            </div>

            <div className={modalstyles.inputWrapper}>
              <div className={modalstyles.iconWrapper}>
                <FaLock /> {}
              </div>
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              />
              {errors.password && <p className={styles.errorText}>This field is required</p>}
            </div>

            <div className={modalstyles.inputWrapper}>
              <div className={modalstyles.iconWrapper}>
                <FaLock /> {}
              </div>
              <input
                type="password"
                placeholder="Confirm password"
                {...register('confirmPassword', { required: true })}
                className={`${modalstyles.input} ${errors.confirmPassword ? modalstyles.inputError : ''}`}
              />
              {errors.confirmPassword && <p className={modalstyles.errorText}>This field is required</p>}
            </div>
          </div>

          <div className={modalstyles.strengthBarBox}>
            <PasswordStrengthBar
              className={modalstyles.strengthBar}
              password={watch('confirmPassword')}
              barColors={['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']}
              scoreWords={['weak', 'weak', 'okay', 'good', 'strong']}
              shortScoreWord=""
              minLength={6}
              scoreWordStyle={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)', margin: '0' }}
              scoreWordClassName="strength-score"
            />
          </div>

          <div className={modalstyles.btnBox}>
  <button
    type="submit"
    disabled={hasTriedSubmit && !isValid}
    className={`${modalstyles.oneBtn} ${modalstyles.multiColorButton}`}
  >
    Register
  </button>
  <Link to="/login">
    <button
      type="button"
      className={`${modalstyles.oneBtn} ${modalstyles.whiteButton}`}
    >
      Log in
    </button>
  </Link>
</div>

          {error && <p className={modalstyles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
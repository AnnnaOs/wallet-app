import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useTogglePassword } from '../../hooks/useTogglePassword';
import { loginUserThunk } from '../../redux/auth/operations';
import { selectIsAuthError, selectIsLoading } from '../../redux/auth/selectors';
import { loginSchema } from '../../validationSchemas/validationSchemas';

import logo from '../../images/logo.svg';
import IconSvg from '../IconSvg/IconSvg';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectIsAuthError);
  const isLoading = useSelector(selectIsLoading);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(loginUserThunk(values)).unwrap();
        toast.success('Welcome back!');
        navigate('/');
      } catch (error) {
        toast.error('Login failed. Please check your credentials.');
        console.error('Login failed:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { visible: showPassword, toggle: togglePassword } = useTogglePassword();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img src={logo} alt="Wallet Logo" className={styles.logo} />
        <h2 className={styles.title}>Money Guard</h2>

        <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <IconSvg className={styles.inputIcon} width={24} height={24} name="icon-email" />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                autoComplete="email"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email && <span className={styles.error}>{formik.errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <IconSvg className={styles.inputIcon} width={24} height={24} name="icon-lock" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button type="button" className={styles.eyeButton} onClick={togglePassword}>
                <IconSvg width={18} height={18} name={showPassword ? 'icon-eye' : 'icon-eye-blocked'} />
              </button>
            </div>
            {formik.touched.password && formik.errors.password && <span className={styles.error}>{formik.errors.password}</span>}
          </div>

          <button type="submit" className={styles.button} disabled={isLoading || formik.isSubmitting}>
            {isLoading ? 'Signing in...' : 'Log In'}
          </button>

          {error && <p className={styles.formError}>{error}</p>}
        </form>

        <Link to="/register" className={styles.link}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

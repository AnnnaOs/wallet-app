import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../redux/auth/operations';
import { selectIsAuthError, selectIsLoading } from '../../redux/auth/selectors';
import { loginSchema } from '../../validationSchemas/validationSchemas';
import styles from './LoginForm.module.css';
import logo from '../../images/logo-mob.svg';
import emailIcon from '../../images/email-icon.svg';
import passwordIcon from '../../images/password-icon.svg';

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
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img src={logo} alt="Wallet Logo" className={styles.logo} />
        <h1 className={styles.title}>Money Guard</h1>

        <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <img
                src={emailIcon}
                alt="Email icon"
                className={styles.inputIcon}
              />
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
            {formik.touched.email && formik.errors.email && (
              <span className={styles.error}>{formik.errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <img
                src={passwordIcon}
                alt="Password icon"
                className={styles.inputIcon}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                className={styles.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <span className={styles.error}>{formik.errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={isLoading || formik.isSubmitting}
          >
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

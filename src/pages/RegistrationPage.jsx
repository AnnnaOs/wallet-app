import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from '../redux/auth/operations';
import { selectAuthError } from '../redux/auth/selectors';
import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const { name, email, password } = formData;
    dispatch(registerUserThunk({ name, email, password }));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.registerButton}>
          Register
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default RegistrationPage;
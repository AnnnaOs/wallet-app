import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutThunk } from '../../redux/auth/operations.js';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock.js';
import logo from '../../images/logo.svg';
import styles from './LogoutModal.module.css';

const LogoutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useBodyScrollLock(isOpen);

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      localStorage.clear();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.logoutOverlay}>
      <div className={styles.logoutModal}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="Wallet Logo" className={styles.logoIcon} />
          <h2 className={styles.logoText}>Money Guard</h2>
        </div>

        <p className={styles.logoutText}>Are you sure you want to log out?</p>

        <div className={styles.buttons}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

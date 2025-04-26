import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../redux/auth/operations.js';
import styles from './LogoutModal.module.css';

const LogoutModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      alert('Logout failed: ' + error);
    }
  };

  return (
    <>
      {/* Тимчасова кнопка — видалити або перемістити при інтеграції */}
      <button className={styles.logoutTriggerButton} onClick={handleOpen}>
        Exit
      </button>

      {isOpen && (
        <div className={styles.logoutOverlay}>
          <div className={styles.logoutModal}>
            <h2 className={styles.logoutTitle}>Exit</h2>
            <p className={styles.logoutText}>
              Are you sure you want to log out?
            </p>
            <div className={styles.logoutButtons}>
              <button
                className={styles.logoutBtnConfirm}
                onClick={handleLogout}
              >
                Log out
              </button>
              <button className={styles.logoutBtnCancel} onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutModal;

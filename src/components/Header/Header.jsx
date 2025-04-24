import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import LogoutModal from '../LogoutModal/LogoutModal';
import logo from '../../images/logo.svg';
import btnExit from '../../images/btnExit.svg';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const email = useSelector(state => state.auth.user?.email);
  const username = email?.split('@')[0];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Money Guard logo" className={styles.logoIcon} />
        <p className={styles.logoText}>Money Guard</p>
      </div>

      <div className={styles.userBlock}>
        <span className={styles.username}>{username || 'Name'}</span>
        <button onClick={openModal} className={styles.exitBtn}>
          <img src={btnExit} alt="Logout Icon" className={styles.icon} />
          <span className={styles.exitText}>Exit</span>
        </button>
      </div>

      {isModalOpen && <LogoutModal onClose={closeModal} />}
    </header>
  );
};

export default Header;

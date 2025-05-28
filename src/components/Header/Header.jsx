import { useState } from 'react';
import { useSelector } from 'react-redux';

import logo from '../../images/logo.svg';
import LogoutModal from '../LogoutModal/LogoutModal';
import IconSvg from '../IconSvg/IconSvg.jsx';
import styles from './Header.module.css';

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
    <header className={styles.headerWrap}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Money Guard logo" className={styles.logoIcon} />
          <p className={styles.logoText}>Money Guard</p>
        </div>

        <div className={styles.userBlock}>
          <span className={styles.username}>{username || 'Name'}</span>
          <button type="button" onClick={openModal} className={styles.exitAppBtn}>
            <IconSvg className={styles.icon} width={18} height={18} name="icon-exit" />
            <span className={styles.exitText}>Exit</span>
          </button>
        </div>
      </div>

      {isModalOpen && <LogoutModal isOpen={isModalOpen} onClose={closeModal} />}
    </header>
  );
};

export default Header;

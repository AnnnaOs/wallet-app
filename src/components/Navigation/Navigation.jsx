import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styles from './Navigation.module.css';

const Navigation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/home">
            {!isMobile && <span className={styles.linkText}>Home</span>}
          </NavLink>
        </li>

        <li className={styles.navItem}>
          <NavLink to="/statistics">
            {!isMobile && <span className={styles.linkText}>Statistics</span>}
          </NavLink>
        </li>

        {isMobile && (
          <li className={styles.navItem}>
            <NavLink to="/currency"></NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

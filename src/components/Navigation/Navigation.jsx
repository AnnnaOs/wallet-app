import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styles from './Navigation.module.css';
import IconSvg from '../IconSvg/IconSvg';

const Navigation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <IconSvg
              className={styles.iconNav}
              width={38}
              height={38}
              name="icon-home"
            />
            {!isMobile && <span className={styles.linkText}>Home</span>}
          </NavLink>
        </li>

        <li className={styles.navItem}>
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <IconSvg
              className={styles.iconNav}
              width={38}
              height={38}
              name="icon-graphic"
            />

            {!isMobile && <span className={styles.linkText}>Statistics</span>}
          </NavLink>
        </li>

        {isMobile && (
          <li className={styles.navItem}>
            <NavLink
              to="/currency"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <IconSvg
                className={styles.iconNav}
                width={38}
                height={38}
                name="icon-dollar"
              />
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

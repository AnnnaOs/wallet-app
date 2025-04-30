import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
// import HomeTab from '../HomeTab/HomeTab';
import Navigation from '../../components/Navigation/Navigation.jsx';
import { useMediaQuery } from 'react-responsive';
import Currency from '../../components/Currency/Currency.jsx';
import Balance from '../../components/Balance/Balance.jsx';
import styles from '../DashboardPage/DashboardPage.module.css';

const DashboardPage = () => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  return (
    <>
      <Header />
      <section className={styles.mainContainer}>
        <div className={styles.navContainer}>
          <div className={styles.navBalance}>
            <Navigation />
            <Balance />
          </div>
          {(isTablet || isDesktop) && <Currency />}
        </div>
        <Outlet />
      </section>
    </>
  );
};

export default DashboardPage;

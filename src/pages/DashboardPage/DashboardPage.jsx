import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Header from '../../components/Header/Header.jsx';
import Navigation from '../../components/Navigation/Navigation.jsx';
// import HomeTab from '../HomeTab/HomeTab';
import Currency from '../../components/Currency/Currency.jsx';
import Balance from '../../components/Balance/Balance.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import styles from './DashboardPage.module.css';

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
        <div className={styles.contentContainer}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;

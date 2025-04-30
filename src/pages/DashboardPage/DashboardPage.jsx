import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Header from '../../components/Header/Header.jsx';
import Navigation from '../../components/Navigation/Navigation.jsx';
import Balance from '../../components/Balance/Balance.jsx';
import CurrencyTab from '../CurrencyTab/CurrencyTab.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.sideContainer}>
          <div>
            <Navigation />
            <Balance />
          </div>
          {(isTablet || isDesktop) && <CurrencyTab />}
        </div>

        <div className={styles.contentContainer}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

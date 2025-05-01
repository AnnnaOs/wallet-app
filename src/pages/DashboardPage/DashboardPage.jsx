import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { fetchTransactions } from '../../redux/transactions/operations.js';
import { getTransactionsCategories } from '../../redux/statistics/operations.js';
import useResponsive from '../../hooks/useResponsive.js';
import Header from '../../components/Header/Header.jsx';
import Navigation from '../../components/Navigation/Navigation.jsx';
import Currency from '../../components/Currency/Currency.jsx';
import Balance from '../../components/Balance/Balance.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { isMobile } = useResponsive();

  useEffect(() => {
    dispatch(getTransactionsCategories());
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <section className={styles.dashboardPage}>
          <div className={styles.dashboardPageMenu}>
            <div>
              <div className={styles.navContainer}>
                <Navigation />
              </div>
              <div className={styles.balanceContainer}>
                {!isMobile && <Balance />}
              </div>
            </div>
            <div className={styles.currencyContainer}>
              {!isMobile && <Currency />}
            </div>
          </div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </section>
      </main>
    </>
  );
};

export default DashboardPage;

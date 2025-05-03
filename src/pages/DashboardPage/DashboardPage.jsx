import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import useResponsive from '../../hooks/useResponsive.js';
import Header from '../../components/Header/Header.jsx';
import Navigation from '../../components/Navigation/Navigation.jsx';
import Currency from '../../components/Currency/Currency.jsx';
import Balance from '../../components/Balance/Balance.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import styles from './DashboardPage.module.css';
import LogoutModal from '../../components/LogoutModal/LogoutModal.jsx';
import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';

const DashboardPage = () => {
  const { isMobile } = useResponsive();

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
              <div className={styles.balanceContainer}>{!isMobile && <Balance />}</div>
            </div>
            <div className={styles.currencyContainer}>{!isMobile && <Currency />}</div>
          </div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
          <LogoutModal />
          <ModalEditTransaction />
          <ModalAddTransaction />
        </section>
      </main>
    </>
  );
};

export default DashboardPage;

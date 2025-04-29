import Header from '../../components/Header/Header.jsx';
import HomeTab from '../HomeTab/HomeTab';
import Navigation from '../../components/Navigation/Navigation.jsx';
import { useMediaQuery } from 'react-responsive';
import CurrencyTab from '../CurrencyTab/CurrencyTab.jsx';
import Balance from '../../components/Balance/Balance.jsx';
import styles from '../DashboardPage/DashboardPage.module.css';

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
        <HomeTab />
      </div>
    </>
  );
};

export default DashboardPage;

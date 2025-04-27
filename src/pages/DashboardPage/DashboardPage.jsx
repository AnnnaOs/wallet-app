import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import HomeTab from '../HomeTab/HomeTab';
import Navigation from '../../components/Navigation/Navigation.jsx';
import { useMediaQuery } from 'react-responsive';
import CurrencyTab from '../CurrencyTab/CurrencyTab.jsx';
import Balance from '../../components/Balance/Balance.jsx';

const DashboardPage = () => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  return (
    <>
      <Header />
      <Navigation />
      <Balance />
      <Link to="/home">
        <HomeTab />
      </Link>
      {(isTablet || isDesktop) && <CurrencyTab />}
    </>
  );
};

export default DashboardPage;

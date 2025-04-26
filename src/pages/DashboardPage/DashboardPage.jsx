import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import HomeTab from '../HomeTab/HomeTab';
import Navigation from '../../components/Navigation/Navigation';
import Balance from '../../components/Balance/Balance';

const DashboardPage = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Balance />
      <Link to="/home">
        🏠 <HomeTab />
      </Link>
    </>
  );
};

export default DashboardPage;

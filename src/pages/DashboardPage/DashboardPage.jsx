import { Link } from 'react-router-dom';
// import TransactionsList from '../../components/TransactionsList/TransactionsList';
import HomeTab from '../HomeTab/HomeTab';
import Header from '../../components/Header/Header';
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
      {/* <TransactionsList /> */}
    </>
  );
};

export default DashboardPage;

import { Link } from 'react-router-dom';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import HomeTab from '../HomeTab/HomeTab';

const DashboardPage = () => {
  return (
    <>
      <Link to="/home">
        🏠 <HomeTab />
      </Link>
      {/* <TransactionsList /> */}
    </>
  );
};

export default DashboardPage;

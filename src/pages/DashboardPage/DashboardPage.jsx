import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import HomeTab from '../HomeTab/HomeTab';

const DashboardPage = () => {
  return (
    <>
      <Header />
      <Link to="/home">
        🏠 <HomeTab />
      </Link>
    </>
  );
};

export default DashboardPage;

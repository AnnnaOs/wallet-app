import { Link } from 'react-router-dom';
import HomeTab from '../HomeTab/HomeTab';

const DashboardPage = () => {
  return (
    <>
      <Link to="/home">
        🏠 <HomeTab />
      </Link>
    </>
  );
};

export default DashboardPage;

import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import HomeTab from '../HomeTab/HomeTab';
import StatisticsTab from '../StatisticsTab/StatisticsTab.jsx';
import s from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <>
      <Header />
      <div className={s.navigationWrap}>
        <NavLink to="/statistics">
          <StatisticsTab />
        </NavLink>
        <NavLink to="/">
          <HomeTab />
        </NavLink>
      </div>
    </>
  );
};

export default DashboardPage;

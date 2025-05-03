import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { getExpenseSummaryByCategories, getIncomeAndExpenseSummaryByPeriod } from '../../redux/statistics/operations';
import { selectStatLoading, selectStatError, selectSummary, selectIncomeSummaryByPeriod, selectExpenseSummaryByPeriod } from '../../redux/statistics/selectors';
import Chart from '../../components/Chart/Chart';
import Loader from '../../components/Loader/Loader';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';
import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import { months } from '../../components/StatisticsDashboard/constants';

import css from './StatisticsTab.module.css';

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const summary = useSelector(selectSummary);
  const isLoading = useSelector(selectStatLoading);
  const error = useSelector(selectStatError);
  const incomeSummaryByPeriod = useSelector(selectIncomeSummaryByPeriod);
  const expensesSummaryByPeriod = useSelector(selectExpenseSummaryByPeriod);

  const token = localStorage.getItem('authToken');

  const now = new Date();
  const currentMonthName = months[now.getMonth() + 1];
  const currentYear = `${now.getFullYear()}`;

  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    if (!isLoggedIn || !token) {
      navigate('/login');
    }
    const fetchData = (monthName, year) => {
      if (!monthName || !year) return;

      const yearNumber = Number(year);
      const monthIndex = months.indexOf(monthName);

      const period = monthName === 'All month' ? { year: yearNumber } : { month: monthIndex, year: yearNumber };

      dispatch(getExpenseSummaryByCategories(period));
      dispatch(getIncomeAndExpenseSummaryByPeriod(period));
    };

    fetchData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, dispatch]);

  const handleMonthChange = month => {
    setSelectedMonth(month);
  };

  const handleYearChange = year => {
    setSelectedYear(year);
  };

  if (error) {
    if (error === 'No token') {
      return (
        <div className={css.statistics}>
          <p className={css.error}>You must be logged in to view statistics</p>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      );
    }

    return (
      <div className={css.statistics}>
        <p className={css.error}>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={css.statistics}>
      <div>
        <h2 className={css.statisticsTitle}>Statistics</h2>
        <div className={css.chart}>
          <Chart summary={summary || []} expensesSummaryByPeriod={expensesSummaryByPeriod || 0} />
        </div>
      </div>

      <div className={css.statisticsData}>
        <div className={css.statisticsDashboard}>
          <StatisticsDashboard selectedMonth={selectedMonth} selectedYear={selectedYear} onMonthChange={handleMonthChange} onYearChange={handleYearChange} />
        </div>
        <StatisticsTable summary={summary || []} incomeSummaryByPeriod={incomeSummaryByPeriod || 0} expensesSummaryByPeriod={expensesSummaryByPeriod || 0} />
      </div>
    </div>
  );
};

export default StatisticsTab;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../../components/Chart/Chart';
import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';
import { fetchStatistics } from '../../redux/statistics/operations';
import {
  selectExpensesByCategory,
  selectStatisticsLoading,
  selectStatisticsError,
} from '../../redux/statistics/selectors';

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const expensesByCategory = useSelector(selectExpensesByCategory);
  const loading = useSelector(selectStatisticsLoading);
  const error = useSelector(selectStatisticsError);

  console.log('StatisticsTab - expensesByCategory:', expensesByCategory);

  useEffect(() => {
    dispatch(
      fetchStatistics({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      })
    );
  }, [dispatch]);

  return (
    <section className="statistics-tab">
      {loading && <p>Loading...</p>}
      {error && <p>Error loading statistics: {error}</p>}
      {!loading && !error && <Chart data={expensesByCategory} />}
      <StatisticsDashboard />
      {!loading && !error && <StatisticsTable data={expensesByCategory} />}
    </section>
  );
};

export default StatisticsTab;
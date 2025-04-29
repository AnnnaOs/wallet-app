import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../redux/statistics/operations';
import { selectStatistics } from '../../redux/statistics/selectors';

import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import Chart from '../../components/Chart/Chart';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';

import styles from './StatisticsTab.module.css';

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchStatistics({ month, year }));
  }, [dispatch, month, year]);

  return (
    <div className={styles.statisticsTab}>
      <StatisticsDashboard
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
      />
      <Chart statistics={statistics} />
      <StatisticsTable statistics={statistics} />
    </div>
  );
};

export default StatisticsTab;

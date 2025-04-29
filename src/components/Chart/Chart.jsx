import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './Chart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ statistics }) => {
  if (!statistics || !statistics.categoriesSummary) return null;

  const categories = statistics.categoriesSummary.filter(cat => cat.total > 0);
  const totalExpenses = statistics.totalExpenses || 0;

  const data = {
    labels: categories.map(cat => cat.name),
    datasets: [
      {
        data: categories.map(cat => cat.total),
        backgroundColor: [
          '#FF6596',
          '#24CCA7',
          '#FED057',
          '#FFD8D0',
          '#6E78E8',
          '#4A56E2',
          '#81E1FF',
          '#00AD84',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.chartWrapper}>
      <Doughnut data={data} options={options} />
      <div className={styles.totalCenter}>₴ {totalExpenses.toFixed(2)}</div>
    </div>
  );
};

export default Chart;

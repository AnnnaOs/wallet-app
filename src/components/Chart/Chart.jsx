import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { selectExpensesByCategory } from '../../redux/statistics/selectors';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const expensesByCategory = useSelector(selectExpensesByCategory);
  const balance = useSelector(state => state.auth?.user?.balance);

  if (!expensesByCategory?.length) {
    return <p style={{ textAlign: 'center' }}>No data to display</p>;
  }

  const data = {
    labels: expensesByCategory.map(cat => cat.name),
    datasets: [
      {
        data: expensesByCategory.map(cat => cat.total),
        backgroundColor: expensesByCategory.map(cat => cat.color),
        borderWidth: 1,
        cutout: '65%',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div style={{ position: 'relative', maxWidth: 400, margin: '0 auto' }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
        }}
      >
        <p style={{ margin: 0 }}>Balance</p>
        <p style={{ margin: 0 }}>
          {balance ? `$${balance.toFixed(2)}` : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default Chart;

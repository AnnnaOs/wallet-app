import styles from './StatisticsTable.module.css';

const StatisticsTable = ({ statistics }) => {
  if (!statistics || !statistics.categoriesSummary) return null;

  const { categoriesSummary, totalExpenses, totalIncome } = statistics;

  const filtered = categoriesSummary.filter(cat => cat.total > 0);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, index) => (
            <tr key={index}>
              <td className={styles.category}>{item.name}</td>
              <td className={styles.amount}>{item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.totals}>
        <p>
          Expenses:{' '}
          <span className={styles.expenses}>₴ {totalExpenses?.toFixed(2)}</span>
        </p>
        <p>
          Income:{' '}
          <span className={styles.income}>₴ {totalIncome?.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default StatisticsTable;

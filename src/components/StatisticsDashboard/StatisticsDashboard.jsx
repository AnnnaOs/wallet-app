import styles from './StatisticsDashboard.module.css';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const years = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() - i
);

const StatisticsDashboard = ({ month, setMonth, year, setYear }) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.selector}>
        <label>Month:</label>
        <select value={month} onChange={e => setMonth(Number(e.target.value))}>
          {months.map((name, idx) => (
            <option key={idx} value={idx + 1}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.selector}>
        <label>Year:</label>
        <select value={year} onChange={e => setYear(Number(e.target.value))}>
          {years.map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StatisticsDashboard;

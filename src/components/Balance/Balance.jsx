// import { useSelector } from 'react-redux';
import s from './Balance.module.css';

const Balance = () => {
  // const totalBalance = useSelector(state => state.finance.totalBalance);

  return (
    <div className={s.balanceCard}>
      <h2 className={s.balanceTitle}>Your balance</h2>
      {/* <p className={s.balanceAmount}>{totalBalance.toFixed(2)} ₴</p> */}
    </div>
  );
};

export default Balance;

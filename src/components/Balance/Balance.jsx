import { useSelector } from 'react-redux';
import s from './Balance.module.css';

const Balance = () => {
  const totalBalance = useSelector(state => state.finance.totalBalance);

  return (
    <div className={s.balanceWrapper}>
      <p className={s.textBalance}>Your balance</p>
      <span className={s.totalBalance}>
        <span className={s.currencyBalance}>&#8372;</span>
        <span className={s.amount}>{totalBalance.toFixed(2)}</span>
      </span>
    </div>
  );
};

export default Balance;

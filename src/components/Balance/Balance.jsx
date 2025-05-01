import { useSelector } from 'react-redux';
import s from './Balance.module.css';

import { selectAllTransactions } from '../../redux/transactions/selectors';

const Balance = () => {
  const transaction = useSelector(selectAllTransactions);
  const totalSum = transaction.reduce((acc, transaction) => {
    if (transaction.type === 'Income') {
      return acc + transaction.sum;
    } else {
      return acc - transaction.sum;
    }
  }, 0);

  // useEffect(() => {
  //   dispatch(fetchTransactions());
  // }, [dispatch]);

  return (
    <div className={s.balanceWrapper}>
      <p className={s.textBalance}>Your balance</p>
      <span className={s.totalBalance}>
        <span className={s.currencyBalance}>&#8372;</span>
        <span className={s.amount}> {totalSum}</span>
      </span>
    </div>
  );
};

export default Balance;

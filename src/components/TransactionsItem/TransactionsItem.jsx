import { useEffect } from 'react';
import {
  deleteTransaction,
  fetchTransactions,
} from '../../redux/transactions/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTransactions } from '../../redux/transactions/selectors';

const TransactionsItem = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map(t => (
          <li key={t._id}>
            {t.category} - {t.sum} грн
            <button onClick={() => dispatch(deleteTransaction(t._id))}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsItem;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   deleteTransaction,
//   fetchTransactions,
// } from '../../redux/transactions/slice';
import { selectAllTransactions } from '../../redux/transactions/selectors';
import {
  deleteTransaction,
  fetchTransactions,
} from '../../redux/transactions/operations';

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

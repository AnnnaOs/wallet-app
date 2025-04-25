import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTransaction,
  fetchTransactions,
  updateTransaction,
} from '../../redux/transactions/operations';
import { selectAllTransactions } from '../../redux/transactions/selectors';
import { formatDate } from '../../utils/formatDate';

const TransactionsItem = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Comment</th>
            <th>Sum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t._id}>
              <td>{formatDate(t.date)}</td>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.comment}</td>
              <td>{t.sum}</td>

              <td>
                <button onClick={() => dispatch(updateTransaction(t._id))}>
                  ✏️
                </button>
              </td>
              <td>
                <button onClick={() => dispatch(deleteTransaction(t._id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsItem;

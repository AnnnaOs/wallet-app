import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTransaction,
  fetchTransactions,
} from '../../redux/transactions/operations';
import { selectAllTransactions } from '../../redux/transactions/selectors';
import { formatDate } from '../../utils/formatDate';
import s from './TransactionsItem.module.css';
import IconSvg from '../IconSvg/IconSvg';
import useResponsive from '../../hooks/useResponsive';
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction.jsx';
const TransactionsItem = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);
  const { isMobile } = useResponsive();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const formatSum = sum => {
    return new Intl.NumberFormat('uk-UA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(sum);
  };

  const openEditModal = transaction => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className={s.homeTabWrap}>
      {isMobile ? (
        // 📱 Мобільна версія
        <ul className={s.mobileList}>
          {transactions.map(t => (
            <li
              key={t._id}
              className={`${s.mobileItem} ${
                t.type === 'Income' ? s.borderOrange : s.borderRed
              }`}
            >
              <li className={s.mobileItemWrap}>
                <span className={s.spanTitleDetails}>Date</span>{' '}
                <span className={s.spanRight}>{formatDate(t.date)}</span>
              </li>
              <li className={s.mobileItemWrap}>
                <span className={s.spanTitleDetails}>Type</span>{' '}
                <span className={s.spanRight}>
                  {t.type === 'Income' ? '+' : '-'}
                </span>
              </li>
              <li className={s.mobileItemWrap}>
                <span className={s.spanTitleDetails}>Category</span>{' '}
                <span className={s.spanRight}>{t.category}</span>
              </li>
              <li className={s.mobileItemWrap}>
                <span className={s.spanTitleDetails}>Comment</span>
                <span className={s.spanRight} style={{ textAlign: 'right' }}>
                  {t.comment}
                </span>
              </li>
              <li className={s.mobileItemWrap}>
                <span className={s.spanTitleDetails}>Sum</span>
                <span
                  className={`${t.type === 'Income' ? s.sumOrange : s.sumRed} ${
                    s.spanRight
                  }`}
                >
                  {formatSum(t.sum)}
                </span>
              </li>
              <div className={s.mobileButtons}>
                <button
                  onClick={() => dispatch(deleteTransaction(t._id))}
                  className={s.deleteBtn}
                >
                  Delete
                </button>
                <button
                  onClick={() => openEditModal(t)}
                  className={`${s.editBtn} ${s.spanRight}`}
                >
                  <IconSvg
                    name="icon-pen"
                    width={14}
                    height={14}
                    className={s.iconEdit}
                  />{' '}
                  <span>Edit</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        // 💻 Планшет/десктоп версія
        <table className={s.table}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Date</th>
              <th style={{ textAlign: 'center' }}>Type</th>
              <th>Category</th>
              <th style={{ textAlign: 'left' }}>Comment</th>
              <th style={{ textAlign: 'right' }}>Sum</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t._id}>
                <td>{formatDate(t.date)}</td>
                <td style={{ textAlign: 'center' }}>
                  {t.type === 'Income' ? '+' : '-'}
                </td>
                <td>{t.category}</td>
                <td>{t.comment}</td>
                <td
                  className={t.type === 'Income' ? s.sumOrange : s.sumRed}
                  style={{ textAlign: 'right' }}
                >
                  {formatSum(t.sum)}
                </td>
                <td
                  style={{
                    padding: '3px',
                  }}
                >
                  <button
                    onClick={() => openEditModal(t)}
                    className={s.editBtn}
                    style={{ marginLeft: 'auto' }}
                  >
                    <IconSvg
                      name="icon-pen"
                      width={14}
                      height={13}
                      className={s.iconEdit}
                    />
                  </button>
                </td>
                <td style={{ paddingLeft: '5px' }}>
                  <button
                    onClick={() => dispatch(deleteTransaction(t._id))}
                    className={s.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* <table>
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
              <td>{t.type === 'Income' ? '+' : '-'}</td>
              <td>{t.category}</td>
              <td>{t.comment}</td>
              <td className={t.type === 'Income' ? s.sumOrange : s.sumRed}>
                {t.sum}
              </td>

              <td>
                <button
                  onClick={() => dispatch(updateTransaction(t._id))}
                  className={s.editBtn}
                >
                  <IconSvg
                    name="icon-pen"
                    width={18}
                    height={18}
                    className={s.iconEdit}
                  />
                </button>
              </td>
              <td>
                <button
                  onClick={() => dispatch(deleteTransaction(t._id))}
                  className={s.deleteBtn}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {selectedTransaction && (
        <ModalEditTransaction
          isOpen={isModalOpen}
          onClose={closeEditModal}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

export default TransactionsItem;

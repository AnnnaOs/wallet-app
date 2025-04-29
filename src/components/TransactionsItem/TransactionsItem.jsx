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
import { AnimatePresence, motion } from 'framer-motion';

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
      {transactions.length !== 0 ? (
        <div>
          <div className={s.topBar}>
            <div></div>{' '}
            <p className={s.transactionCount}>
              Всього транзакцій: {transactions.length}
            </p>
          </div>
          <div className={s.transactionsContainer}>
            {isMobile ? (
              <ul className={s.mobileList}>
                <AnimatePresence>
                  {transactions.map(t => (
                    <motion.li
                      key={t._id}
                      className={`${s.mobileItem} ${
                        t.type === 'Income' ? s.borderOrange : s.borderRed
                      }`}
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        duration: 0.3,
                      }}
                    >
                      <ul>
                        <li className={s.mobileItemWrap}>
                          <span className={s.spanTitleDetails}>Date</span>
                          <span className={s.spanRight}>
                            {formatDate(t.date)}
                          </span>
                        </li>
                        <li className={s.mobileItemWrap}>
                          <span className={s.spanTitleDetails}>Type</span>
                          <span className={s.spanRight}>
                            {t.type === 'Income' ? '+' : '-'}
                          </span>
                        </li>
                        <li className={s.mobileItemWrap}>
                          <span className={s.spanTitleDetails}>Category</span>
                          <span className={s.spanRight}>{t.category}</span>
                        </li>
                        <li className={s.mobileItemWrap}>
                          <span className={s.spanTitleDetails}>Comment</span>
                          <span
                            className={s.spanRight}
                            style={{ textAlign: 'right' }}
                          >
                            {t.comment}
                          </span>
                        </li>
                        <li className={s.mobileItemWrap}>
                          <span className={s.spanTitleDetails}>Sum</span>
                          <span
                            className={`${
                              t.type === 'Income' ? s.sumOrange : s.sumRed
                            } ${s.spanRight}`}
                          >
                            {formatSum(t.sum)}
                          </span>
                        </li>
                      </ul>
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
                          />
                          <span>Edit</span>
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            ) : (
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
                  <AnimatePresence>
                    {transactions.map(t => (
                      <motion.tr
                        key={t._id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          duration: 0.3,
                        }}
                      >
                        <td>{formatDate(t.date)}</td>
                        <td style={{ textAlign: 'center' }}>
                          {t.type === 'Income' ? '+' : '-'}
                        </td>
                        <td>{t.category}</td>
                        <td>{t.comment}</td>
                        <td
                          className={
                            t.type === 'Income' ? s.sumOrange : s.sumRed
                          }
                          style={{ textAlign: 'right' }}
                        >
                          {formatSum(t.sum)}
                        </td>
                        <td style={{ padding: '3px' }}>
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
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <motion.p
          className={s.emptyText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          У вас ще немає транзакцій 📝
        </motion.p>
      )}

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

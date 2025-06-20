import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { deleteTransaction } from '../../redux/transactions/operations';
import { selectAllTransactions } from '../../redux/transactions/selectors';
import { formatDate } from '../../utils/formatDate';
import useResponsive from '../../hooks/useResponsive';

import IconSvg from '../IconSvg/IconSvg';
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction.jsx';
import CustomSelect from '../EditTransactionForm/CustomSelect.jsx';
import s from './TransactionsItem.module.css';

const TransactionsItem = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);
  const { isMobile } = useResponsive();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filterType, setFilterType] = useState('All');

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

  const filteredTransactions = transactions.filter(t => {
    if (filterType === 'All') return true;
    return t.type === (filterType === 'Income' ? 'Income' : 'Expense');
  });

  return (
    <div className={s.homeTabWrap}>
      {transactions.length !== 0 ? (
        <div>
          <div className={s.topBar}>
            <div className={s.selectWrapper}>
              <label htmlFor="filterSelect" className={`${s.selectLabel} sr-only`}>
                Filter by type
              </label>
              <div className={s.selectContainer}>
                <CustomSelect options={['All', 'Income', 'Expense']} value={filterType} onChange={value => setFilterType(value)} name="filterSelect" placeholder="Select type" />
              </div>
            </div>
            <p className={s.transactionCount}>Total: {transactions.length}</p>
          </div>
          <div className={s.transactionsContainer}>
            {isMobile ? (
              <ul className={s.mobileList}>
                <AnimatePresence>
                  {filteredTransactions.map(t => (
                    <motion.li
                      key={t._id}
                      className={`${s.mobileItem} ${t.type === 'Income' ? s.borderOrange : s.borderRed}`}
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
                          <span className={s.spanRight}>{formatDate(t.date)}</span>
                        </li>
                        <li className={s.mobileItemWrap}>
                          <span className={s.spanTitleDetails}>Type</span>
                          <span className={s.spanRight}>{t.type === 'Income' ? '+' : '-'}</span>
                        </li>
                        <li className={s.mobileItemWrap}>
                          <span className={s.spanTitleDetails}>Category</span>
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
                          <span className={`${t.type === 'Income' ? s.sumOrange : s.sumRed} ${s.spanRight}`}>{formatSum(t.sum)}</span>
                        </li>
                      </ul>
                      <div className={s.mobileButtons}>
                        <button onClick={() => dispatch(deleteTransaction(t._id))} className={s.deleteBtn}>
                          Delete
                        </button>
                        <button onClick={() => openEditModal(t)} className={`${s.editBtn} ${s.spanRight}`}>
                          <IconSvg name="icon-pen" width={14} height={14} className={s.iconEdit} />
                          <span>Edit</span>
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            ) : (
              <div className={s.tableWrapper}>
                <table className={s.table}>
                  <thead className={s.thead}>
                    <tr className={s.tr}>
                      <th style={{ textAlign: 'left' }} className={s.th}>
                        Date
                      </th>
                      <th style={{ textAlign: 'center' }} className={s.th}>
                        Type
                      </th>
                      <th className={s.th}>Category</th>
                      <th style={{ textAlign: 'left' }} className={s.th}>
                        Comment
                      </th>
                      <th style={{ textAlign: 'right' }} className={s.th}>
                        Sum
                      </th>
                      <th className={s.th} style={{ width: '50px', padding: 0 }}></th>
                      <th className={s.th} style={{ width: '100px', padding: 0 }}></th>
                    </tr>
                  </thead>
                  <tbody className={s.tbody}>
                    <AnimatePresence>
                      {filteredTransactions.map(t => (
                        <motion.tr
                          key={t._id}
                          className={s.tr}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            duration: 0.3,
                          }}
                        >
                          <td className={s.td}>{formatDate(t.date)}</td>
                          <td style={{ textAlign: 'center' }} className={s.td}>
                            {t.type === 'Income' ? '+' : '-'}
                          </td>
                          <td className={s.td}>{t.category}</td>
                          <td className={s.td}>{t.comment}</td>
                          <td className={`${t.type === 'Income' ? s.sumOrange : s.sumRed} ${s.td}`} style={{ textAlign: 'right' }}>
                            {formatSum(t.sum)}
                          </td>
                          <td style={{ padding: '3px' }} className={s.td}>
                            <button onClick={() => openEditModal(t)} className={s.editBtn} style={{ marginLeft: 'auto' }}>
                              <IconSvg name="icon-pen" width={14} height={13} className={s.iconEdit} />
                            </button>
                          </td>
                          <td style={{ paddingLeft: '5px' }} className={s.td}>
                            <button onClick={() => dispatch(deleteTransaction(t._id))} className={s.deleteBtn}>
                              Delete
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={s.emptyTextWrap}>
          <motion.p className={s.emptyText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            У вас ще немає транзакцій 📝
          </motion.p>
        </div>
      )}

      {selectedTransaction && <ModalEditTransaction isOpen={isModalOpen} onClose={closeEditModal} transaction={selectedTransaction} />}
    </div>
  );
};

export default TransactionsItem;

import { useEffect } from 'react';
import style from './ModalAddTransaction.module.css';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';

const ModalAddTransaction = ({ onClose }) => {
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={style.backdrop} onClick={handleBackdropClick}>
      <div className={style.modal}>
        <AddTransactionForm onClose={onClose} />
      </div>
    </div>
  );
};

export default ModalAddTransaction;

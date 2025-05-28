import Modal from 'react-modal';
import { useEffect, useState } from 'react';

import { useBodyScrollLock } from '../../hooks/useBodyScrollLock.js';
import useResponsive from '../../hooks/useResponsive.js';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm.jsx';
import Loader from '../Loader/Loader.jsx';
import IconSvg from '../IconSvg/IconSvg.jsx';

import style from './ModalAddTransaction.module.css';

Modal.setAppElement('#root');

const ModalAddTransaction = ({ isOpen, onClose, transaction }) => {
  const { isMobile } = useResponsive();
  const [isLoading, setIsLoading] = useState(true);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className={style.modal} overlayClassName={style.backdrop} contentLabel="Add Transaction Modal">
      <div className={style.modalEllipse}>
        <div className={style.modalHeader}>
          <h2 className={style.modalTitle}>Add transaction</h2>

          {!isMobile && (
            <button onClick={onClose} className={style.closeButton}>
              <IconSvg width={16} height={16} name="icon-close" />
            </button>
          )}
        </div>

        {isLoading ? (
          <div className={style.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <AddTransactionForm transaction={transaction} onClose={onClose} />
        )}
      </div>
    </Modal>
  );
};

export default ModalAddTransaction;

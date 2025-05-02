import { useState } from 'react';

import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction.jsx';
import IconSvg from '../IconSvg/IconSvg.jsx';
import style from './ButtonAddTransactions.module.css';

const ButtonAddTransactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <button type="button" onClick={handleOpen} className={style.addTransactionsBtn}>
        <IconSvg className={style.plusIcon} width={20} height={20} name="icon-plus" />
      </button>

      <ModalAddTransaction isOpen={isModalOpen} onClose={handleClose} />
    </>
  );
};

export default ButtonAddTransactions;

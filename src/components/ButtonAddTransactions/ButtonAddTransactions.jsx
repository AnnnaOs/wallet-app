import { useState } from 'react';

import IconSvg from '../IconSvg/IconSvg.jsx'; // Иконка

import style from './ButtonAddTransactions.module.css'; // Стили кнопки
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction.jsx';

const ButtonAddTransactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
  <button type="button" onClick={handleOpen} className={style.addBtn}>
    <IconSvg
      className={style.plusIcon}
      width={20}
      height={20}
      name="icon-plus"
    />
  </button>

  <ModalAddTransaction isOpen={isModalOpen} onClose={handleClose} />
</>

  );
};

export default ButtonAddTransactions;

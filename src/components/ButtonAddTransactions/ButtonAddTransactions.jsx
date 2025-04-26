import { useState } from "react";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm.jsx"; // Путь к модалке
import IconSvg from "../IconSvg/IconSvg.jsx"; // Иконка

import style from './ButtonAddTransactions.module.css'; // Стили кнопки

const ButtonAddTransactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <button type="button" onClick={handleOpen} className={style.closeButton}>
        <IconSvg
          className={style.icon}
          width={44}
          height={44}
          name="icon-plus"
        />
      </button>

      {isModalOpen && (
        <AddTransactionForm onClose={handleClose} />
      )}
    </>
  );
};

export default ButtonAddTransactions;

import { useDispatch } from 'react-redux';
import { openAddModal } from '../../redux/modals/slice';
import IconSvg from '../IconSvg/IconSvg';
import css from './ButtonAddTransactions.module.css';

const ButtonAddTransactions = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openAddModal());
  };

  return (
    <button className={css.addBtn} type="button" onClick={handleClick}>
      <IconSvg
        className={css.plusIcon}
        width={20}
        height={20}
        name="icon-plus"
      />
    </button>
  );
};

export default ButtonAddTransactions;

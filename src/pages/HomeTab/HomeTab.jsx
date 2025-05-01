import useResponsive from '../../hooks/useResponsive';
import Balance from '../../components/Balance/Balance';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import s from './HomeTab.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categories/operations.js';
import { areCategoriesLoaded } from '../../redux/categories/selectors.js';
import { fetchTransactions } from '../../redux/transactions/operations.js';

const HomeTab = () => {
  const { isMobile } = useResponsive();
  const dispatch = useDispatch();
  const categoriesLoaded = useSelector(areCategoriesLoaded);

  useEffect(() => {
    if (!categoriesLoaded) {
      dispatch(fetchTransactions());
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesLoaded]);

  return (
    <div className={s.homeTabPageWrap}>
      <div className={s.container}>
        {isMobile && <Balance />}
        <TransactionsList />
        <ButtonAddTransactions />
      </div>
    </div>
  );
};

export default HomeTab;

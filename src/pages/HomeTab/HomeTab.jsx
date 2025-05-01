// import useResponsive from '../../hooks/useResponsive';
// import Balance from '../../components/Balance/Balance';
import { useDispatch } from 'react-redux';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import s from './HomeTab.module.css';
import { fetchCategories } from '../../redux/modals/operations.js';
import React, { useEffect } from 'react';  // Добавьте useEffect

// import Currency from '../../components/Currency/Currency';

const HomeTab = () => {
  // const { isMobile } = useResponsive();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('dispatching fetchCategories');
    dispatch(fetchCategories());
  }, [dispatch]);


  return (
    <div className={s.homeTabPageWrap}>
      <div className={s.container}>
        {/* {isMobile && <Balance />} */}
        <TransactionsList />
        <ButtonAddTransactions />
      </div>
    </div>
  );
};

export default HomeTab;

// import useResponsive from '../../hooks/useResponsive';
// import Balance from '../../components/Balance/Balance';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import s from './HomeTab.module.css';
// import Currency from '../../components/Currency/Currency';

const HomeTab = () => {
  // const { isMobile } = useResponsive();

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

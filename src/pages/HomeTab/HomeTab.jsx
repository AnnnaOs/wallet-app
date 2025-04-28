import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import TransactionsList from '../../components/TransactionsList/TransactionsList';

const HomeTab = () => {
  return (
    <>
      <TransactionsList />
      <ButtonAddTransactions />
    </>
  );
};

export default HomeTab;


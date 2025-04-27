import TransactionsList from '../../components/TransactionsList/TransactionsList';
import s from './HomeTab.module.css';

const HomeTab = () => {
  return (
    <div className={s.homeTabPageWrap}>
      <div className={s.container}>
        <TransactionsList />
      </div>
    </div>
  );
};

export default HomeTab;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyChart from './CurrencyChart';
import { fetchCurrencyRates } from '../../redux/currency/operations.js';
import s from './Currency.module.css';
import Loader from '../Loader/Loader.jsx';
import clsx from 'clsx';

const Currency = () => {
  const dispatch = useDispatch();
  const { usdRate, euroRate, loading, error } = useSelector(
    state => state.currency
  );

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  const data = [
    { name: 'start', currency: 8, label: '' },
    {
      name: 'USD',
      currency: parseFloat(usdRate.rateBuy),
      label: usdRate.rateBuy,
    },
    { name: 'middle', currency: 10, label: '' },
    {
      name: 'EURO',
      currency: parseFloat(euroRate.rateBuy),
      label: euroRate.rateBuy,
    },
    { name: 'end', currency: 25, label: '' },
  ];

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        {loading && <Loader />}
        {error && <p className={s.error}>{error}</p>}
        {!loading && !error && (
          <>
            <table className={s.tab}>
              <thead>
                <tr className={clsx(s.tr, s.header)}>
                  <th className={s.item}>Currency</th>
                  <th className={s.item}>Purchase</th>
                  <th className={s.item}>Sale</th>
                </tr>
              </thead>
              <tbody>
                <tr className={s.tr}>
                  <td className={s.item}>USD</td>
                  <td className={s.item}>{usdRate.rateBuy}</td>
                  <td className={s.item}>{usdRate.rateSell}</td>
                </tr>
                <tr className={s.tr}>
                  <td className={s.item}>EUR</td>
                  <td className={s.item}>{euroRate.rateBuy}</td>
                  <td className={s.item}>{euroRate.rateSell}</td>
                </tr>
              </tbody>
            </table>
            <CurrencyChart data={data} />
          </>
        )}
      </div>
    </div>
  );
};

export default Currency;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrencyData, selectCurrencyLoading } from '../../redux/currency/selectors';
import { getCurrency } from '../../redux/currency/operations';
// import useResponsive from '../../hooks/useResponsive';
import CurrencyChart from './CurrencyChart/CurrencyChart';
import s from './Currency.module.css';

const Currency = () => {
  // const { isTablet } = useResponsive();
  const dispatch = useDispatch();
  const currencyData = useSelector(selectCurrencyData);
  const isLoading = useSelector(selectCurrencyLoading);

  const usdRateBuy = currencyData?.usd?.buy;
  const euroRateBuy = currencyData?.euro?.buy;
  const usdRateSell = currencyData?.usd?.sell;
  const euroRateSell = currencyData?.euro?.sell;

  useEffect(() => {
    dispatch(getCurrency());
  }, [dispatch]);

  const formatCurrency = value => {
    if (value === undefined || value === null) return '-';
    return Number(value).toFixed(2);
  };

  const data = [
    { value: formatCurrency(usdRateBuy) - 15 },
    { value: formatCurrency(usdRateBuy) },
    { value: formatCurrency(euroRateBuy) - 20 },
    { value: formatCurrency(euroRateBuy) },
    { value: formatCurrency(euroRateBuy) - 15 },
  ];

  return (
    <div className={s.container}>
      {isLoading ? (
        <div className={s.loading}>Loading currency data...</div>
      ) : (
        <table className={s.currencyTable}>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Purchase</th>
              <th>Sale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USD</td>
              <td className={s.rate}>{formatCurrency(usdRateBuy)}</td>
              <td className={s.rate}>{formatCurrency(usdRateSell)}</td>
            </tr>
            <tr>
              <td>EUR</td>
              <td className={s.rate}>{formatCurrency(euroRateBuy)}</td>
              <td className={s.rate}>{formatCurrency(euroRateSell)}</td>
            </tr>
          </tbody>
        </table>
      )}
      <div>
        <CurrencyChart data={data} />
      </div>
    </div>
  );
};

export default Currency;

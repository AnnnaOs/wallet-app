import { createAsyncThunk } from '@reduxjs/toolkit';
import { monoAPI } from '../../configAPI/monoApi.js';

const CURRENCY_KEY = 'currencyData';
const ONE_HOUR = 60 * 60 * 1000;

export const fetchCurrencies = async () => {
  const { data } = await monoAPI.get('/bank/currency');

  const getCurrency = codeA => {
    const currency = data.find(c => c.currencyCodeA === codeA && c.currencyCodeB === 980);
    if (!currency) return null;
    return {
      buy: currency.rateBuy,
      sell: currency.rateSell,
    };
  };

  return {
    usd: getCurrency(840),
    euro: getCurrency(978),
  };
};

const getCurrencyFromStorage = () => {
  const savedData = localStorage.getItem(CURRENCY_KEY);
  if (!savedData) return null;
  const { timestamp, rate } = JSON.parse(savedData);
  return Date.now() - timestamp < ONE_HOUR ? rate : null;
};

const saveCurrencyToStorage = rate => {
  localStorage.setItem(CURRENCY_KEY, JSON.stringify({ timestamp: Date.now(), rate }));
};

export const getCurrency = createAsyncThunk('currency/fetch', async (_, thunkAPI) => {
  try {
    const stored = getCurrencyFromStorage();
    if (stored) return stored;

    const updatedRate = await fetchCurrencies();
    saveCurrencyToStorage(updatedRate);
    return updatedRate;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

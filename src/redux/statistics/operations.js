import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken, api } from '../../configAPI/api';

export const getTransactionsCategories = createAsyncThunk(
  'transactions/categories',
  async (_, thunkApi) => {
    // const savedToken = thunkApi.getState().auth.token;
    const savedToken = localStorage.getItem('authToken');

    if (!savedToken) {
      return thunkApi.rejectWithValue('No token');
    }

    setToken(savedToken);

    try {
      const { data } = await api.get('/summary/transaction-categories');
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || 'Failed to fetch categories'
      );
    }
  }
);

export const getExpenseSummaryByCategories = createAsyncThunk(
  'transactions/summaryByCategories',
  async ({ month, year }, thunkApi) => {
    // const savedToken = thunkApi.getState().auth.token;
    const savedToken = localStorage.getItem('authToken');

    if (!savedToken) {
      return thunkApi.rejectWithValue('No token');
    }

    setToken(savedToken);

    try {
      let query = `/summary/transactions-summary/categories?year=${year}`;
      if (typeof month === 'number') {
        query += `&month=${month}`;
      }

      const { data } = await api.get(query);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || 'Failed to fetch expense summary'
      );
    }
  }
);

export const getIncomeAndExpenseSummaryByPeriod = createAsyncThunk(
  'transactions/summaryByPeriod',
  async ({ month, year }, thunkApi) => {
    // const savedToken = thunkApi.getState().auth.token;
    const savedToken = localStorage.getItem('authToken');

    if (!savedToken) {
      return thunkApi.rejectWithValue('No token');
    }

    setToken(savedToken);

    try {
      let query = `/summary/transactions-summary-by-period?year=${year}`;
      if (typeof month === 'number') {
        query += `&month=${month}`;
      }

      const { data } = await api.get(query);
      const { incomeSummaryByPeriod, expenseSummaryByPeriod } = data.data;

      return {
        incomeSummaryByPeriod,
        expenseSummaryByPeriod,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || 'Failed to fetch summary by period'
      );
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../configAPI/api';


// Отримання всіх транзакцій
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/transactions');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Створення транзакції
export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transaction, thunkAPI) => {
    try {
      const { data } = await api.post('/transactions', transaction);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Оновлення транзакції
export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async ({ id, ...transaction }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/transactions/${id}`, transaction);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Видалення транзакції
export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/transactions/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

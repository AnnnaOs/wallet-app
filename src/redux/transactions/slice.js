// redux/contacts/slice.js

import { createSlice } from '@reduxjs/toolkit';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [], // массив транзакций
    loading: false,
    error: null,
  },
  reducers: {
    addTransactionRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTransactionSuccess: (state, action) => {
      state.loading = false;
      state.transactions.push(action.payload); // добавляем новую транзакцию
    },
    addTransactionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // сохраняем ошибку
    },
  },
});

export const { addTransactionRequest, addTransactionSuccess, addTransactionFailure } = transactionsSlice.actions;

export default transactionsSlice.reducer;


// redux/transactions/slice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from './operations';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Створення асинхронних операцій (thunks)
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await fetch('http://localhost:3000/transactions', {
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODBhMGM0ZDFhMTA3M2ExNzIwNmNhZDkiLCJpYXQiOjE3NDU0OTc1NTgsImV4cCI6MTc0NTU4Mzk1OH0.GAXFSGHQw98TYxOdFy5E-P9vdfz2UfrJJAdFKy5y--A`,
      },
    });
    const data = await response.json();
    return data;
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async id => {
    await fetch(`http://localhost:3000/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return id; // Повертаємо ID для того, щоб видалити його з Redux
  }
);

// 2. Створення slice
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          transaction => transaction._id !== action.payload
        );
      });
  },
});

export default transactionsSlice.reducer;

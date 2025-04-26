// redux/contacts/selectors.js

export const selectTransactions = (state) => state.transactions.transactions;
export const selectLoading = (state) => state.transactions.loading;
export const selectError = (state) => state.transactions.error;


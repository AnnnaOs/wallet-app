export const selectUser = state => state.auth.user;
export const selectUserBalance = state => state.auth.user.balance;
export const selectToken = state => state.auth.token;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsLoading = state => state.auth.isLoading;
export const selectIsAuthError = state => state.auth.isAuthError;

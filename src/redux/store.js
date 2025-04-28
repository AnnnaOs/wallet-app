import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';

// import { transactionsReducer } from './transactions/slice';
import { statisticsReducer } from './statistics/slice';

import transactionsReducer from './transactions/slice';
import { financeReducer } from './finance/slice';

// import { modalsReducer } from './modals/slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
const transactionsPersistConfig = {
  key: 'transactions',
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    transactions: persistReducer(
      transactionsPersistConfig,
      transactionsReducer
    ),
    finance: financeReducer,

    // transactions: transactionsReducer,
    statistics: statisticsReducer,
    // modals: modalsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

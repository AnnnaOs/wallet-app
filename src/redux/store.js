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
import transactionsReducer from './transactions/slice';
import { currencyReducer } from './currency/slice';
import { statisticsReducer } from './statistics/slice';
import { modalsReducer } from './modals/slice';
import { authReducer } from './auth/slice';
import { categoriesReducer } from './categories/slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
const transactionsPersistConfig = {
  key: 'transactions',
  storage,
};

const currencyPersistConfig = {
  key: 'currency',
  storage,
  whitelist: ['currencies', 'lastRequestTime'],
};

const categoriesPersistConfig = {
  key: 'categories',
  storage,
  whitelist: ['expenses', 'income'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    currency: persistReducer(currencyPersistConfig, currencyReducer),
    transactions: persistReducer(
      transactionsPersistConfig,
      transactionsReducer
    ),
    statistics: statisticsReducer,
    modals: modalsReducer,
    categories: persistReducer(categoriesPersistConfig, categoriesReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

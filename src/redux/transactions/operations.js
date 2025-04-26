// redux/contacts/operations.js

import { addTransactionRequest, addTransactionSuccess, addTransactionFailure } from './slice'; // Подключаем действия из слайса
import { api } from '../../configAPI/api'; // Подключаем API

export const addTransaction = (transaction) => async (dispatch) => {
  dispatch(addTransactionRequest());
  try {
    const response = await api.post('/transactions', transaction); // отправка транзакции
    dispatch(addTransactionSuccess(response.data)); // успешный запрос
  } catch (error) {
    dispatch(addTransactionFailure(error.message)); // ошибка запроса
  }
};

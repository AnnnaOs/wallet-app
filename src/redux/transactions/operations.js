import axios from 'axios';

const BASE_URL = 'http://localhost:3000/transactions';

export const fetchTransactions = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};

export const createTransaction = async transaction => {
  const { data } = await axios.post(BASE_URL, transaction);
  return data;
};

export const updateTransaction = async ({ id, ...transaction }) => {
  const { data } = await axios.patch(`${BASE_URL}/${id}`, transaction);
  return data;
};

export const deleteTransaction = async id => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
};

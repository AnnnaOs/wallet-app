import { api } from '../../configAPI/api';

export const fetchCategories = async () => {
  const { data } = await api.get('/categories');
  return data;
};

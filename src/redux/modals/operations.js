export const fetchCategories = createAsyncThunk(
  '/categories',
  async (_, { getState, rejectWithValue }) => {
    const { transactions } = getState();
    if (transactions.categoriesFetched) {
      console.log('Categories already fetched');
      return rejectWithValue('Categories already fetched');
    }
    try {
      console.log('Fetching categories...');
      const response = await api.get('/categories');
      const categories = response.data;
      console.log('Fetched categories:', categories);
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

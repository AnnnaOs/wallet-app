import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUserThunk } from './operations';

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentUserThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(fetchCurrentUserThunk.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;

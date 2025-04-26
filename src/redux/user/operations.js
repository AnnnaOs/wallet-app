import { createAsyncThunk } from "@reduxjs/toolkit";

export const apiMg = axios.create({
    baseURL: 'http://localhost:3000/api',
  });  

export const fetchCurrentUserThunk = createAsyncThunk('user/current', async (_, thunkAPI) => {
    try {
        const {data} = await apiMg.get('current');
        
        return data;
    } catch (error) {
        console.log('Ошибка при загрузке данных:', error.response.data);
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const editCurrentUserThunk = createAsyncThunk(
    'user/editCurrentUser',
    async ({ id, name, email, balance, avatarUrl }, thunkAPI) => {
      try {
        const updateData = {};
if (name !== undefined) updateData.name = name;
if (email !== undefined) updateData.email = email;
if (balance !== undefined) updateData.balance = balance;
if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
 // Только разрешённые поля
  
        const { data } = await apiMg.patch(`/user/${id}`, updateData);
        return data;
      } catch (error) {
        console.log('Ошибка обновления данных:', error.response?.data);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
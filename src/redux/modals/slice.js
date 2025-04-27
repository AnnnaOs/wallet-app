import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddModalOpen: true,
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAddModal(state) {
      state.isAddModalOpen = true;
    },
    closeAddModal() {
      return initialState;
    },
  },
});

export const { openAddModal, closeAddModal } = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;

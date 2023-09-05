import { createSlice } from '@reduxjs/toolkit';

const selectedStockSlice = createSlice({
  name: 'selectedStock',
  initialState: null as string | null,
  reducers: {
    setSelectedStock: (state, action) => action.payload,
  },
});

export const { setSelectedStock } = selectedStockSlice.actions;

export default selectedStockSlice.reducer;
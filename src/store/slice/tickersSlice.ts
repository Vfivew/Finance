import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Stock } from '../../models/Stock';

const initialState: Stock[] = [];

const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    setTickers: (state, action: PayloadAction<Stock[]>) => {
      return action.payload;
    },
    resetTicker: (state) => {
      return initialState;
    },
    addTicker: (state, action: PayloadAction<Stock>) => {
      state.push(action.payload);
    },
    updatePreviousDayStockPrice: (
      state,
      action: PayloadAction<{ ticker: string; previousDayStockPrice: number }>
    ) => {
      const { ticker, previousDayStockPrice } = action.payload;
      const tickerToUpdate = state.find((t) => t.ticker === ticker);
      if (tickerToUpdate) {
        tickerToUpdate.previousDayStockPrice = previousDayStockPrice;
      }
    },
    removeTicker: (state, action: PayloadAction<string>) => {
      const tickerToRemove = action.payload;
      return state.filter((ticker) => ticker.ticker !== tickerToRemove);
    },
  },
});

export const { setTickers,resetTicker, addTicker, updatePreviousDayStockPrice, removeTicker } = tickersSlice.actions;

export default tickersSlice.reducer;
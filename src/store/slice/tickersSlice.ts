import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ticker {
  name: string;
  ticker: string;
  selectedDate: string;
  stockPrice: number;
  previousDayStockPrice?: number;
}

const initialState: Ticker[] = [];

const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    setTickers: (state, action: PayloadAction<Ticker[]>) => {
      return action.payload;
    },
    addTicker: (state, action: PayloadAction<Ticker>) => {
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

export const { setTickers, addTicker, updatePreviousDayStockPrice, removeTicker } = tickersSlice.actions;

export default tickersSlice.reducer;
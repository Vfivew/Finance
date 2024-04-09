import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Stock } from "../../models/Stock";

const initialState: Stock[] = [];

const tickersSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {
    setTickers: (state, action: PayloadAction<Stock[]>) => {
      return action.payload;
    },
    resetTicker: () => {
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
    sortTickersByNameAscending: (state) => {
      state.sort((a, b) => a.name.localeCompare(b.name));
      console.log(state);
    },
    sortTickersByNameDescending: (state) => {
      state.sort((a, b) => b.name.localeCompare(a.name));
    },
    sortTickersByDateAscending: (state) => {
      state.sort((a, b) => a.selectedDate.localeCompare(b.selectedDate));
    },
    sortTickersByDateDescending: (state) => {
      state.sort((a, b) => b.selectedDate.localeCompare(a.selectedDate));
    },
    sortTickersByPriceAscending: (state) => {
      state.sort((a, b) => a.stockPrice - b.stockPrice);
    },
    sortTickersByPriceDescending: (state) => {
      state.sort((a, b) => b.stockPrice - a.stockPrice);
    },
    sortTickersByTodayPriceAscending: (state) => {
      state.sort((a, b) => a.previousDayStockPrice - b.previousDayStockPrice);
    },
    sortTickersByTodayPriceDescending: (state) => {
      state.sort((a, b) => b.previousDayStockPrice - a.previousDayStockPrice);
    },
    sortTickersByProfitAscending: (state) => {
      state.sort((a, b) => {
        const profitA = a.stockPrice - a.previousDayStockPrice;
        const profitB = b.stockPrice - b.previousDayStockPrice;
        return profitA - profitB;
      });
    },
    sortTickersByProfitDescending: (state) => {
      state.sort((a, b) => {
        const profitA = a.stockPrice - a.previousDayStockPrice;
        const profitB = b.stockPrice - b.previousDayStockPrice;
        return profitB - profitA;
      });
    },
  },
});

export const {
  sortTickersByNameAscending,
  sortTickersByNameDescending,
  sortTickersByDateAscending,
  sortTickersByDateDescending,
  sortTickersByPriceAscending,
  sortTickersByPriceDescending,
  sortTickersByTodayPriceAscending,
  sortTickersByTodayPriceDescending,
  sortTickersByProfitAscending,
  sortTickersByProfitDescending,
  setTickers,
  resetTicker,
  addTicker,
  updatePreviousDayStockPrice,
  removeTicker,
} = tickersSlice.actions;

export default tickersSlice.reducer;

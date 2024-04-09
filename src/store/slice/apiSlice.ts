import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.REACT_APP_POLYGON;

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.polygon.io" }),
  endpoints: (builder) => ({
    getTickerInfo: builder.query({
      query: (ticker) => `/vX/reference/tickers/${ticker}?apiKey=${apiKey}`,
    }),
    getStockPricesForDate: builder.query({
      query: ({ ticker, endDate, startDate }) =>
        `/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}?unadjusted=true&apiKey=${apiKey}`,
    }),
  }),
});

export const { useGetTickerInfoQuery, useGetStockPricesForDateQuery } = api;
export { api, apiKey };

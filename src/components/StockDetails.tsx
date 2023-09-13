import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetStockPricesForLastYearQuery } from '../store/slice/apiSlice';
import { getPreviousWeekday } from '../utils/getPreviousWeekday';
import { calculateStartDate } from '../utils/calculateData';
import { useAppSelector } from '../hooks/redux-hooks';
import StockChart from './StockChart';

interface StockPriceItem {
  c: any;
}

const StockDetails: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const tickers = useAppSelector((state) => state.tickers);
  const endDate = getPreviousWeekday();
  const [startDate, setStartDate] = useState<string>(calculateStartDate(endDate));
  const { data: stockPrices, error: stockPricesError, refetch } = useGetStockPricesForLastYearQuery({ ticker, endDate, startDate });

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    refetch();
  };


  const tickerExists = tickers.some((t) => t.ticker === ticker);
  const previousDayStockPrice = tickerExists ? tickers.find((t) => t.ticker === ticker)?.previousDayStockPrice ?? null : null;

  return (
    <div>
      <h1>Детали акции</h1>
      <p>Тикер: {ticker}</p>

      <div>
        <label>Выберите начальную дату:</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
      </div>

      {stockPricesError && <p>Помилка при завантаженні цін акцій за останній рік. Повторіть запит через хвилину!.</p>}
      {stockPrices && (
        <div>
          <h2>Цены акций за последний год:</h2>
          <StockChart data={stockPrices.results.map((price: StockPriceItem) => price.c)} previousDayStockPrice={previousDayStockPrice} />
        </div>
      )}
    </div>
  );
};

export default StockDetails;
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetStockPricesForDateQuery } from '../../store/slice/apiSlice';
import { getPreviousWeekday } from '../../utils/getPreviousWeekday';
import { calculateStartDate } from '../../utils/calculateData';
import { useAppSelector } from '../../hooks/redux-hooks';
import StockChart from './StockChart';

interface StockPriceItem {
  c: any;
}

const StockDetails: FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const tickers = useAppSelector((state) => state.tickers);
  const endDate = getPreviousWeekday();
  const [startDate, setStartDate] = useState<string>(calculateStartDate(endDate));
  const { data: stockPrices, error: stockPricesError, refetch } = useGetStockPricesForDateQuery({ ticker, endDate, startDate });

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    refetch();
  };


  const tickerExists = tickers.some((t) => t.ticker === ticker);
  const previousDayStockPrice = tickerExists ? tickers.find((t) => t.ticker === ticker)?.previousDayStockPrice ?? null : null;

  return (
    <div>
      <h2 className='font-bold text-size22 mb-2'>Stock Detail</h2>
      <p>Ticker: {ticker}</p>
      <div>
        <label>Select a start date:</label>
        <input type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="text-size14 text-black p-1 m-2 rounded border-2 border-fifth focus:outline-none focus:ring focus:border-blue-200"
        />
      </div>
      {stockPricesError && <p>Error loading stock prices for the last year. Try again in a minute!</p>}
      {stockPrices && (
        <div>
          <h2>Share prices for the last year:</h2>
          <StockChart data={stockPrices.results.map((price: StockPriceItem) => price.c)} previousDayStockPrice={previousDayStockPrice} />
        </div>
      )}
    </div>
  );
};

export default StockDetails;
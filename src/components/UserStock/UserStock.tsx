import { FC,useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getDataFirebase } from '../../services/getDataFirebase';
import { deleteDataFirebase } from '../../services/deleteDataFirebase';
import { setTickers, updatePreviousDayStockPrice, removeTicker } from '../../store/slice/tickersSlice';
import { getStockPriceForPreviousWorkday } from '../../utils/getStockPriceForPreviousWorkday';
import { getPreviousWeekday } from '../../utils/getPreviousWeekday';
import { Link } from 'react-router-dom';
import { Stock } from '../../models/Stock';
import {calculateProfitOrLoss} from './calculateProfitOrLoss'

import Loading from '../Loading/Loading';
import Timer from '../Timer'

const UserStock: FC = () => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [loading, setIsLoading] = useState(false)
  const userEmail = useAppSelector((state) => state.user.email) as string;
  const tickers = useAppSelector((state) => state.tickers);
  const dispatch = useAppDispatch();
  const lastData = getPreviousWeekday();
  const isDataLoaded = tickers.length > 0;

  useEffect(() => {
    async function fetchData() {
      try {
        if (!isDataLoaded) {
          setIsLoading(true)
          const tickersData = await getDataFirebase(userEmail);
          if (tickersData.length === 0) {
            setIsLoading(false)
            return;
          }
          setIsLoading(false)
          const stockPricePromises = tickersData.map(async (ticker) => {
            const StockPriceForPreviousWorkday = await getStockPriceForPreviousWorkday(
              ticker.ticker,
              lastData
            );
            if (StockPriceForPreviousWorkday !== null) {
              dispatch(
                updatePreviousDayStockPrice({
                  ticker: ticker.ticker,
                  previousDayStockPrice: StockPriceForPreviousWorkday,
                })
              );
            } else {
              console.warn(`Ціна акції для ${ticker.ticker} рівна null.`);
            }
            return {
              ...ticker,
              previousDayStockPrice: StockPriceForPreviousWorkday || ticker.previousDayStockPrice,
            };
          });

          const updatedTickersData = await Promise.all(stockPricePromises);
          console.log(updatedTickersData);

          dispatch(setTickers(updatedTickersData));
        }
      } catch (error) {
        console.error('Помилка при завантажені даних з Firebase:', error);
      }
    }

    fetchData();
    updatePreviousDayPrices();

    const timer = setTimeout(() => {
      updatePreviousDayPrices();
    }, 60000);

    return () => clearTimeout(timer);
  }, [dispatch, userEmail, isDataLoaded, tickers, lastData]);

  const updatePreviousDayPrices = async () => {
    for (const ticker of tickers) {
      if (typeof ticker.previousDayStockPrice === 'undefined') {
        const StockPriceForPreviousWorkday = await getStockPriceForPreviousWorkday(
          ticker.ticker,
          lastData
        );
        if (StockPriceForPreviousWorkday !== null) {
          dispatch(
            updatePreviousDayStockPrice({
              ticker: ticker.ticker,
              previousDayStockPrice: StockPriceForPreviousWorkday,
            })
          );
        } else {
          console.warn(`Ціна акциї для ${ticker.ticker} рівна null.`);
        }
      }
    }
  };

  const handleRemoveTicker = async (ticker: Stock) => {
    try {
      setIsRemoving(true);
      await deleteDataFirebase(ticker.ticker, userEmail);
      dispatch(removeTicker(ticker.ticker));
      setIsRemoving(false);
    } catch (error) {
      console.error('Помилка при видаленні акції:', error);
      setIsRemoving(false);
    }
  };

  return (
    <section>
      <Timer initialSeconds={60} />
      <h1 className='m-2'>Information about tickers</h1>
      <div className="overflow-x-auto">
        <table className='table-fixed w-full'>
          <thead>
            <tr>
              <th className="w-10% border border-white">Name</th>
              <th className="w-10% border border-white">Ticker</th>
              <th className="w-10% border border-white">Date</th>
              <th className="w-10% border border-white">Share price</th>
              <th className="w-40% border border-white">The closing price of the last trading day</th>
              <th className="w-10% border border-white">Profit</th>
              <th className="w-10% border border-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loading />
            ) : (
              tickers.map((ticker, index) => (
                <tr key={index}>
                  <td className="border border-white py-2"><Link to={`/stock/${ticker.ticker}`}>{ticker.name}</Link></td>
                  <td className="border border-white py-2">{ticker.ticker}</td>
                  <td className="border border-white py-2">{ticker.selectedDate}</td>
                  <td className="border border-white py-2">{ticker.stockPrice}$</td>
                  <td className="border border-white py-2">{ticker.previousDayStockPrice}$</td>
                  <td className={`border border-white py-2 ${isRemoving ? 'text-gray-500' : ''}`}>
                    {calculateProfitOrLoss(ticker.stockPrice, ticker.previousDayStockPrice)}
                  </td>
                  <td className="border border-white py-2">
                    {isRemoving ? (
                      <Loading />
                    ) : (
                      <button onClick={() => handleRemoveTicker(ticker)}>Stop following</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserStock;
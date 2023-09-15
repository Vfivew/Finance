import { FC,useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getDataFirebase } from '../services/getDataFirebase';
import { deleteDataFirebase } from '../services/deleteDataFirebase';
import { setTickers, updatePreviousDayStockPrice, removeTicker } from '../store/slice/tickersSlice';
import { getStockPriceForPreviousWorkday } from '../utils/getStockPriceForPreviousWorkday';
import { getPreviousWeekday } from '../utils/getPreviousWeekday';
import { Link } from 'react-router-dom';
import { Stock } from '../models/Stock';

import Loading from './Loading/Loading';
import Timer from './Timer'

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
    <div>
      <Timer initialSeconds={60} />
      <h1>Информация о тикерах</h1>
      {loading ? (
        <Loading /> // Показываем индикатор загрузки данных
      ) : (
        tickers.map((ticker, index) => (
          <li key={index}>
            <Link to={`/stock/${ticker.ticker}`}>
              <p>Імя: {ticker.name}</p>
              <p>Тікер: {ticker.ticker}</p>
              <p>Дата: {ticker.selectedDate}</p>
              <p>Ціна акції: {ticker.stockPrice}</p>
              <p>Ціна закриття останнього торгово дня: {ticker.previousDayStockPrice}</p>
            </Link>
            {isRemoving ? (
              <Loading />
            ) : (
              <button onClick={() => handleRemoveTicker(ticker)}>Видалити акцію</button>
            )}
          </li>
        ))
      )}
    </div>
  );
};

export default UserStock;
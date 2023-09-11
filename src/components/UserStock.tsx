import React, { useEffect } from 'react';
import { useAppDispatch,useAppSelector } from '../hooks/redux-hooks';
import { getDataFirebase } from '../services/getDataFirebase';
import {deleteDataFirebase} from '../services/deleteDataFirebase'
import { setTickers, updatePreviousDayStockPrice, removeTicker } from '../store/slice/tickersSlice';
import { getStockPriceForPreviousWorkday } from '../hooks/getStockPriceForPreviousWorkday';
import { getPreviousWeekday } from '../utils/getPreviousWeekday';

interface Ticker {
  name: string;
  ticker: string;
  selectedDate: string;
  stockPrice: number;
  previousDayStockPrice?: number;
}

const UserStock = () => {
  const userEmail = useAppSelector((state) => state.user.email) as string;
  const tickers = useAppSelector((state) => state.tickers);
  const dispatch = useAppDispatch();
  const lastData = getPreviousWeekday();
  const isDataLoaded = tickers.length > 0;

  useEffect(() => {
    async function fetchData() {
      try {
        if (!isDataLoaded) {
          const tickersData = await getDataFirebase(userEmail);

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

              const updatedTicker = {
                ...ticker,
                previousDayStockPrice: StockPriceForPreviousWorkday,
              };

              return updatedTicker;
            } else {
              console.warn(`Цена акции для ${ticker.ticker} равна null.`);
              return ticker;
            }
          });

          const updatedTickersData = await Promise.all(stockPricePromises); 
          console.log(updatedTickersData)

          dispatch(setTickers(updatedTickersData));
        } else {
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
                console.warn(`Цена акции для ${ticker.ticker} равна null.`);
              }
            }
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных из Firebase:', error);
      }
    }

    fetchData();
  }, [dispatch, userEmail, isDataLoaded, tickers]);

const handleRemoveTicker = async (ticker: Ticker) => {
  try {
    await deleteDataFirebase(ticker.ticker, userEmail);
    dispatch(removeTicker(ticker.ticker));
    console.log(tickers)
  } catch (error) {
    console.error('Ошибка при удалении акции:', error);
  }
  console.log(tickers)
};
console.log(tickers)

  return (
    <div>
      <h1>Информация о тикерах</h1>
      <ul>
        {tickers.map((ticker, index) => (
          <li key={index}>
            <p>Имя: {ticker.name}</p>
            <p>Тикер: {ticker.ticker}</p>
            <p>Дата: {ticker.selectedDate}</p>
            <p>Цена акции: {ticker.stockPrice}</p>
            <p>Цена на предыдущий рабочий день: {ticker.previousDayStockPrice}</p>
            <button onClick={() => handleRemoveTicker(ticker)}>Удалить акцию</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserStock;
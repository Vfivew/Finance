import React, { useState, useEffect } from 'react';
import { useGetTickerInfoQuery, useGetStockPriceQuery } from '../store/slice/apiSlice';
import { addDataFirebase } from '../services/addDataFirebase';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { addTicker } from '../store/slice/tickersSlice';

const AddStock: React.FC = () => {
  const [tickerInput, setTickerInput] = useState<string>('');
  const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [following, setIsFollowing] = useState<boolean>(false);
  const [trackeDate, setTrackedDate] = useState<string>('');
  const userEmail = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch(); 
 
  const { data: tickerInfo, error: tickerError } = useGetTickerInfoQuery(tickerInput, {
    skip: !isQueryEnabled,
    refetchOnMountOrArgChange: true,
  });

  const { data: stockPriceInfo, error: stockPriceError } = useGetStockPriceQuery(
    {
      ticker: tickerInput,
      selectedDate: selectedDate,
    },
    {
      skip: !isQueryEnabled,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (tickerInfo && tickerInfo.results && stockPriceInfo.results) {
      addDataFirebase({ results: tickerInfo.results, userEmail, selectedDate, stockPrice: stockPriceInfo.results[0].c })
        .then((result) => {
          console.log({ results: tickerInfo.results, userEmail, selectedDate, stockPrice: stockPriceInfo.results[0].c });
          if (result.success) {
            setIsFollowing(result.isFollowing);
            setTrackedDate(result.trackedDate);

          if (!result.isFollowing) {
            const newTicker = {
              name: tickerInfo.results.name,
              ticker: tickerInfo.results.ticker,
              selectedDate: selectedDate,
              stockPrice: stockPriceInfo.results[0].c,
            };
            dispatch(addTicker(newTicker));
          }
        }
      })
        .catch((error) => {
          console.error('Ошибка при добавлении данных в Firebase:', error);
        });
    }
  }, [tickerInfo, dispatch, userEmail]); 

  const handleGetTickerInfo = () => {
    if (tickerInput && selectedDate) {
      setIsQueryEnabled(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'text') {
      setTickerInput(e.target.value);
    } else if (e.target.type === 'date') {
      setSelectedDate(e.target.value);
    }
    setIsQueryEnabled(false);
  };

  return (
    <div>
      <h1>Інформація по тікеру</h1>
      <div>
        <label>Введіть тікер: </label>
        <input type="text" value={tickerInput} onChange={handleInputChange} />
        <input
          type="date"
          value={selectedDate}
          onChange={handleInputChange}
        />
        <button onClick={handleGetTickerInfo}>Получить информацию</button>
        <div>
          {following && <p> Ви вже відслідковуйте тікер з дати {trackeDate}</p>}
      {stockPriceError && <p>Ошибка при запросе: Произошла ошибка при получении информации о цене.</p>}
      {stockPriceInfo && stockPriceInfo.results && stockPriceInfo.results.length > 0 ? (
        <div>
          <h2>Информация по цене числа {selectedDate}:</h2>
          <p>{stockPriceInfo.results[0].c}</p>
          {/* ІНШІ ДАНІ */}
        </div>
      ) : (
        <p>В этот день торгов не было.</p>
      )}
      </div>
      </div>
      {tickerError && <p>Ошибка при запросе: Произошла ошибка при получении информации о тикере.</p>}
      {tickerInfo && (
        <div>
          <h2>Информация по тикеру {tickerInput}:</h2>
          <p>Имя тикера: {tickerInfo.results.ticker}</p>
          <p>Описание: {tickerInfo.results.description}</p>
          {/*ІНШІ ДАНІ */}
        </div>
      )}
    </div>
  );
};

export default AddStock;
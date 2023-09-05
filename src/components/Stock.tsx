import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const Stock: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [tickerInput, setTickerInput] = useState<string>('META'); // Тикер "META" по умолчанию
  const [dateInput, setDateInput] = useState<string>('2023-01-09'); // Дата по умолчанию
  const apiKey = 'JkhLUe7CKK8zbSUp55fa6O7VK5uPtdM2';

  const fetchData = async () => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.polygon.io/v1/open-close/${tickerInput}/${dateInput}?adjusted=true&apiKey=${apiKey}`
      );
      setData(response.data);
    } catch (error) {
      console.error('Помилки при запиту до API:', error);
    }
  };

  const handleFetchData = () => {
    fetchData();
  };

  return (
    <div>
      <h1>Данні по тікеру META</h1>
      <div>
        <label>Введіть тікер: </label>
        <input type="text" value={tickerInput} onChange={(e) => setTickerInput(e.target.value)} />
        <label>Введіть дату (YYYY-MM-DD): </label>
        <input type="text" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
        <button onClick={handleFetchData}>Запросити дані</button>
      </div>
      {data && data.status === 'OK' ? (
        <div>
          <p>Дата: {data.from}</p>
          <p>Відкриття: {data.open}</p>
          <p>Закриття: {data.close}</p>
          <p>Максимум: {data.high}</p>
          <p>Мінімум: {data.low}</p>
          <p>Обєм: {data.volume}</p>
          <p>Після годин: {data.afterHours}</p>
          <p>OTC: {data.otc}</p>
        </div>
      ) : (
        <p>Дані не знайдено або виникла помилка.</p>
      )}
    </div>
  );
};

export default Stock;
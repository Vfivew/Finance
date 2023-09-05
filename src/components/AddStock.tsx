import React, { useState } from 'react';
import axios from 'axios';

const TickerInfo: React.FC = () => {
  const [tickerInput, setTickerInput] = useState<string>('');
  const [tickerInfo, setTickerInfo] = useState<any>(null); 
  const apiKey = 'JkhLUe7CKK8zbSUp55fa6O7VK5uPtdM2';

  const fetchData = async (ticker: string) => {
    try {
      const response = await axios.get(
        `https://api.polygon.io/vX/reference/tickers/${ticker}?apiKey=${apiKey}`
      );
      setTickerInfo(response.data.results);
    } catch (error) {
      console.error('Помилка при запиті од API:', error);
      setTickerInfo(null);
    }
  };

  const handleAddTicker = () => {
    fetchData(tickerInput);
  };

  return (
    <div>
      <h1>Информация по тикеру</h1>
      <div>
        <label>Введите тикер: </label>
        <input type="text" value={tickerInput} onChange={(e) => setTickerInput(e.target.value)} />
        <button onClick={handleAddTicker}>Добавить</button>
      </div>
      {tickerInfo ? (
        <div>
          <h2>Информация по тикеру {tickerInput}:</h2>
          <div>
            <h3>ticker: {tickerInfo.ticker}</h3>
            <h3>name: {tickerInfo.name}</h3>
            <p>market: {tickerInfo.market}</p>
            <p>locale: {tickerInfo.locale}</p>
            <p>primary_exchange: {tickerInfo.primary_exchange}</p>
            <p>type: {tickerInfo.type}</p>
            <p>active: {tickerInfo.active.toString()}</p>
            <p>currency_name: {tickerInfo.currency_name}</p>
            <p>cik: {tickerInfo.cik}</p>
            <p>composite_figi: {tickerInfo.composite_figi}</p>
            <p>share_class_figi: {tickerInfo.share_class_figi}</p>
            <p>market_cap: {tickerInfo.market_cap}</p>
            <p>phone_number: {tickerInfo.phone_number}</p>
            <p>address1: {tickerInfo.address.address1}</p>
            <p>city: {tickerInfo.address.city}</p>
            <p>state: {tickerInfo.address.state}</p>
            <p>postal_code: {tickerInfo.address.postal_code}</p>
            <h3>description:</h3>
            <p>{tickerInfo.description}</p>
            <p>sic_code: {tickerInfo.sic_code}</p>
            <p>sic_description: {tickerInfo.sic_description}</p>
            <p>ticker_root: {tickerInfo.ticker_root}</p>
            <p>homepage_url: {tickerInfo.homepage_url}</p>
            <p>total_employees: {tickerInfo.total_employees}</p>
            <p>list_date: {tickerInfo.list_date}</p>
            <p>share_class_shares_outstanding: {tickerInfo.share_class_shares_outstanding}</p>
            <p>weighted_shares_outstanding: {tickerInfo.weighted_shares_outstanding}</p>
            <p>round_lot: {tickerInfo.round_lot}</p>
            <img src={`${tickerInfo.branding?.logo_url}?apiKey=${apiKey}`} alt="Логотип" />
          </div>
        </div>
      ) : (
        <p>Нет доступной информации по тикеру {tickerInput} или произошла ошибка при запросе.</p>
      )}
    </div>
  );
};

export default TickerInfo;
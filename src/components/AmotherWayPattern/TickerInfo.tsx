import React, { useState } from 'react';
// import { addDataFirebase } from '../../services/addDataFirebase';
import { useAppSelector } from '../../hooks/redux-hooks';
import { fetchTickerInfo, fetchStockPrice } from './usePolygonApi';

const TickerInfo: React.FC = () => {
  const [tickerInput, setTickerInput] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [tickerInfo, setTickerInfo] = useState<any>(null);
  const userEmail = useAppSelector((state) => state.user.email);
  const apiKey = 'JkhLUe7CKK8zbSUp55fa6O7VK5uPtdM2';

  const handleAddTicker = async () => {
    try {
      const tickerInfoResponse = await fetchTickerInfo(tickerInput);
      const stockPriceResponse = await fetchStockPrice(tickerInput, selectedDate);

      setTickerInfo(tickerInfoResponse);
      console.log(tickerInfo);

      const stockPrice = stockPriceResponse[0]?.c || 'Цена не найдена';
      console.log(`Цена акции ${tickerInput} на ${selectedDate}: $${stockPrice}`);

      if (tickerInfoResponse) {
        // await addDataFirebase({ tickerInfo: tickerInfoResponse, userEmail, selectedDate });
        console.log({ tickerInfo: tickerInfoResponse, userEmail, selectedDate })
      }
    } catch (error) {
      console.error('Ошибка при выполнении операций:', error);
    }
  };

  return (
    <div>
      <h1>Інформація по тікеру</h1>
      <div>
        <label>Введіть тікер: </label>
        <input type="text" onChange={(e) => setTickerInput(e.target.value)} />
        <br />
        <label>Выберите дату: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={handleAddTicker}>Додати</button>
      </div>
      {tickerInfo ? (
        <div> 
          <h2>Информация по тикеру {tickerInput}:</h2>
          <div>
            <ul>
              {Object.keys(tickerInfo).map((key) => (
                <li key={key}>
                  <strong>{key}:</strong>{' '}
                  {typeof tickerInfo[key] === 'object' ? (
        
                    <ul>
                      {Object.keys(tickerInfo[key]).map((subKey) => (
                        <li key={subKey}>
                          <strong>{subKey}:</strong> {tickerInfo[key][subKey] || 'Данные не найдены'}
                        </li>
                      ))}
                    </ul>
                  ) : (
      
                    tickerInfo[key] || 'Данные не найдены'
                  )}
                </li>
              ))}
            </ul>
            {tickerInfo.branding && tickerInfo.branding.logo_url && (
              <img src={`${tickerInfo.branding?.logo_url}?apiKey=${apiKey}`} alt="Логотип" />
            )}
          </div>
        </div>
      ) : (
        <p>Нет доступной информации по тикеру {tickerInput} или произошла ошибка при запросе.</p>
      )}
    </div>
  );
};

export default TickerInfo;
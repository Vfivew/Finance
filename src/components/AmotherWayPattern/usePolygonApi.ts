
import axios from 'axios';

const apiKey = 'JkhLUe7CKK8zbSUp55fa6O7VK5uPtdM2';

export async function fetchTickerInfo(ticker: string) {
  try {
    const response = await axios.get(`https://api.polygon.io/vX/reference/tickers/${ticker}?apiKey=${apiKey}`);
    return response.data.results;
  } catch (error) {
    console.error('Ошибка при запросе к API для информации о тикере:', error);
    throw error;
  }
}

export async function fetchStockPrice(ticker: string, selectedDate: string) {
  try {
    const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${selectedDate}/${selectedDate}?unadjusted=true&apiKey=${apiKey}`);
    return response.data.results;
  } catch (error) {
    console.error('Ошибка при запросе к API для цены акции:', error);
    throw error;
  }
}
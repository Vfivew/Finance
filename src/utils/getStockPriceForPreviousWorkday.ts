import axios from 'axios';
import { apiKey } from '../store/slice/apiSlice';

export async function getStockPriceForPreviousWorkday(ticker: string, selectedDate: string): Promise<number | null> {
  try {
    const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${selectedDate}/${selectedDate}?unadjusted=true&apiKey=${apiKey}`);
    const StockPriceForPreviousWorkday = response.data.results[0].c;
    return StockPriceForPreviousWorkday;
  } catch (error) {
    return null;
  }
}
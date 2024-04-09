export interface Stock {
  name: string;
  selectedDate: string;
  stockPrice: number;
  ticker: string;
  previousDayStockPrice?: any;
}

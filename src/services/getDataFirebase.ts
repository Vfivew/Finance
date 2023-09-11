import { doc, getDoc } from 'firebase/firestore';
import { database } from '../firebase';

export interface TickerData {
  name: string;
  selectedDate: string;
  stockPrice: number;
  ticker: string;
  previousDayStockPrice?: any; 
}

const getDataFirebase = async (userEmail: string): Promise<TickerData[]> => {
  try {
    const userDocRef = doc(database, 'Finance', userEmail);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const tickers = userData?.tickers || [];

      return tickers;
    } else {
      return []; 
    }
  } catch (error) {
    console.error('Ошибка при получении данных из Firebase:', error);
    return []; 
  }
};

export { getDataFirebase };
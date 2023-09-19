import { doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { database } from '../firebase';

interface TickerData {
  results: any;
  userEmail: string | null;
  selectedDate: string;
  stockPrice: number;
}

const addDataFirebase = async ({ results, userEmail, selectedDate, stockPrice }: TickerData) => {
  if (results && userEmail) {
    try {
      const userDocRef = doc(database, 'Finance', userEmail);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const tickers = userData?.tickers || [];

        const existingTicker = tickers.find((tickerData: any) => {
          return tickerData.ticker === results.ticker;
        });

        if (existingTicker) {
          return { success: true, isFollowing: true, trackedDate: existingTicker.selectedDate };
        }

        await updateDoc(userDocRef, {
          tickers: arrayUnion({
            ticker: results.ticker,
            name: results.name,
            selectedDate: selectedDate,
            stockPrice: stockPrice, 
          }),
        });

        return { success: true, isFollowing: false, trackedDate: selectedDate };
      } else {
        await setDoc(userDocRef, {
          tickers: [
            {
              ticker: results.ticker,
              name: results.name,
              selectedDate: selectedDate,
              stockPrice: stockPrice,
            },
          ],
        });
        return { success: true, isFollowing: false, trackedDate: selectedDate };
      }
    } catch (error) {
      return { success: false, isFollowing: false, trackedDate: null };
    }
  }

  return { success: false, isFollowing: false, trackedDate: null };
};

export { addDataFirebase };
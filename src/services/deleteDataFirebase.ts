import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { getDataFirebase } from './getDataFirebase';

const deleteDataFirebase = async ( tickerToDelete: string, userEmail: string) => {
  try {
    const tickersData = await getDataFirebase(userEmail);
    console.log(tickersData)
    const indexToDelete = tickersData.findIndex((ticker) => ticker.ticker === tickerToDelete);

    if (indexToDelete === -1) {
      console.log(`Ticker name ${tickerToDelete} not found in the Firestore`);
      return;
    }

    tickersData.splice(indexToDelete, 1);

    const userDocRef = doc(database, 'Finance', userEmail);
    await updateDoc(userDocRef, { tickers: tickersData });

    console.log(`Ticker name ${tickerToDelete} successfully removed from Firestore`);
  } catch (error) {
    console.error('Deleting Error the ticker from Firestore:', error);
    throw error;
  }
};

export { deleteDataFirebase };

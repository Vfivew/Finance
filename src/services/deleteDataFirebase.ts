import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { getDataFirebase } from './getDataFirebase';

const deleteDataFirebase = async ( tickerToDelete: string, userEmail: string) => {
  try {
    const tickersData = await getDataFirebase(userEmail);
    const indexToDelete = tickersData.findIndex((ticker) => ticker.ticker === tickerToDelete);

    if (indexToDelete === -1) {
      return;
    }

    tickersData.splice(indexToDelete, 1);

    const userDocRef = doc(database, 'Finance', userEmail);
    await updateDoc(userDocRef, { tickers: tickersData });
  } catch (error) {
    throw error;
  }
};

export { deleteDataFirebase };

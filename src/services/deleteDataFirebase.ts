import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { getDataFirebase } from './getDataFirebase';

const deleteDataFirebase = async ( tickerToDelete: string, userEmail: string) => {
  try {
    const tickersData = await getDataFirebase(userEmail);
    console.log(tickersData)
    const indexToDelete = tickersData.findIndex((ticker) => ticker.ticker === tickerToDelete);

    if (indexToDelete === -1) {
      console.log(`Тикер с именем ${tickerToDelete} не найден в данных Firestore`);
      return;
    }

    tickersData.splice(indexToDelete, 1);

    const userDocRef = doc(database, 'Finance', userEmail);
    await updateDoc(userDocRef, { tickers: tickersData });

    console.log(`Тикер с именем ${tickerToDelete} успешно удален из Firestore`);
  } catch (error) {
    console.error('Ошибка при удалении тикера из Firestore:', error);
    throw error;
  }
};

export { deleteDataFirebase };

import { doc, getDoc } from 'firebase/firestore';
import { database } from '../firebase';
import { Stock } from '../models/Stock';

const getDataFirebase = async (userEmail: string): Promise<Stock[]> => {
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
    return []; 
  }
};

export { getDataFirebase };
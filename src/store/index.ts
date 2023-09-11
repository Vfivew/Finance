import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer, { setUser, removeUser } from './slice/userSlice';
import { api } from "./slice/apiSlice"; 
import tickersReducer from './slice/tickersSlice'; 

const userToken = localStorage.getItem('userToken');
const userEmail = localStorage.getItem('userEmail');
const userId = localStorage.getItem('userId');

export const store = configureStore({
  reducer: {
    user: userReducer,
    tickers: tickersReducer,
    [api.reducerPath]: api.reducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  preloadedState: {
    user: {
      email: userEmail || null,
      token: userToken || null,
      id: userId || null,
    },
  },
});

if (userToken) {
  store.dispatch(setUser({ email: userEmail || '', id: userId || '', token: userToken }));
} else {
  store.dispatch(removeUser());
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
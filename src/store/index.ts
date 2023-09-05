import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer, { setUser } from './slice/userSlice';

// Получите токен пользователя из localStorage
const userToken = localStorage.getItem('userToken');
const userEmail = localStorage.getItem('userEmail');
const userId = localStorage.getItem('userId');

// Инициализируйте начальное состояние пользователя
const initialUserState = {
  email: userEmail || null,
  token: userToken || null,
  id: userId || null,
};

// Создайте Redux-стор с начальным состоянием пользователя
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [...getDefaultMiddleware()],
  preloadedState: {
    user: initialUserState,
  },
});

// Если токен присутствует в localStorage, обновите Redux-состояние с помощью setUser
if (userToken) {
  store.dispatch(setUser({ email: userEmail || '', id: userId || '', token: userToken }));
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
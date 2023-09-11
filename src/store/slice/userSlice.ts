import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      localStorage.setItem('userEmail', action.payload.email || '');
      localStorage.setItem('userToken', action.payload.token || '');
      localStorage.setItem('userId', action.payload.id || '');
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
    },
  },
});

export const selectUserEmail = (state: { user: UserState }) => state.user.email;

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
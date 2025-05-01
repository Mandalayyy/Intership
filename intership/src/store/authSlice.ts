// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any | null; // Можна використовувати точніший тип, якщо потрібно
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload; // Оновлення користувача
    },
    clearUser: (state) => {
      state.user = null; // Очищення даних про користувача
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

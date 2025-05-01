// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from '@/store/eventsSlice';
import authReducer from '@/store/authSlice'; 

const store = configureStore({
    reducer: {
      events: eventsSlice, // Existing events reducer
      auth: authReducer,     // Add the new auth reducer here
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;





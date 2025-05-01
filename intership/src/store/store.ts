
import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from '@/store/eventsSlice';
import authReducer from '@/store/authSlice'; 

const store = configureStore({
    reducer: {
      events: eventsSlice,
      auth: authReducer,     
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;





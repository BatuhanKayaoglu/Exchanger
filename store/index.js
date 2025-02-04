import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { exchangesApi } from './apis/exchangeApi';
import currencyReducer from './slices/currencySlice';    

export const store = configureStore({
  reducer: {
    [exchangesApi.reducerPath]: exchangesApi.reducer, 
    currency: currencyReducer, 
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exchangesApi.middleware), // RTK Query middleware'ini ekledik
});

setupListeners(store.dispatch); // RTK Query'nin otomatik yeniden çağırma (refetching) özelliklerini etkinleştirir.

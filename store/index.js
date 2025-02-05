import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { exchangesApi } from "./apis/exchangeApi";
import { authApi } from "./apis/authApi";
import currencyReducer from "./slices/currencySlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [exchangesApi.reducerPath]: exchangesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,

    currency: currencyReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(exchangesApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch); // RTK Query'nin otomatik yeniden çağırma (refetching) özelliklerini etkinleştirir.

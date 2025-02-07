import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, EXCHANGE_BASE_URL } from "@env";

export const exchangesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: EXCHANGE_BASE_URL + API_KEY,
  }),

  tagTypes: ["Exchange"],

  endpoints: (builder) => ({
    getExchanges: builder.query({
      providesTags: ["Exchange"],
      query: () => "/latest/USD",
    }),

    getExchange: builder.query({
      query: (currency) => `/latest/${currency}`,
    }),
  }),
});

export const { useGetExchangesQuery, useGetExchangeQuery } = exchangesApi;

export default exchangesApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exchangesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://v6.exchangerate-api.com/v6/" + "a9b90cf5c27013b3c1686482",
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

export const {
  useGetExchangesQuery,
  useGetExchangeQuery,
} = exchangesApi;

export default exchangesApi;

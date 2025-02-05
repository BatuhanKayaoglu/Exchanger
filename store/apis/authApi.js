import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.2.2:3000", 
  }),

  endpoints: (builder) => ({

    // Sign up endpoint
    signUp: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // Sign in endpoint
    signIn: builder.mutation({
        query: (userData) => ({
            url: "/signin",
            method: "POST",
            body: userData,
            headers: {
            "Content-Type": "application/json",
            },
        }),
    }),

  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
export default authApi;

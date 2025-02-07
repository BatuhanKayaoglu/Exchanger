import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_BASE_URL } from "@env";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_BASE_URL, 
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

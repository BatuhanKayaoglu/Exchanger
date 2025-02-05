import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const exchangesApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://v6.exchangerate-api.com/v6/'+"a9b90cf5c27013b3c1686482",  
    }),

    tagTypes: ['Exchange'],

    endpoints: (builder) => ({
        getExchanges: builder.query({
            providesTags: ['Exchange'],
            query: () => '/latest/USD',
        }),

        getUser: builder.query({
            query: (currency) => `/latest/${currency}`,
        }),

        createUser: builder.mutation({
            invalidatesTags: () => [{ type: 'User' }], // 'User' tag'ini invalid etmeyi belirtiyoruz yani benim bir silme ekleme güncelleme gibi durumlarda tekrar fetch etmesini istiyorum.

            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
        }),

        updateUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'PUT',
                body: user,
            }),
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export the auto-generated hooks
export const {
    useGetExchangesQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = exchangesApi;

export default exchangesApi;

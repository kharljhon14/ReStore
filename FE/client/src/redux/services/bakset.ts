import { IBasket, IBasketQuery } from '@/types/basket';
import baseApi from './base';

const basketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBasket: builder.query<IBasket, void>({
      query: () => 'basket',
      providesTags: ['Basket'],
    }),
    addItem: builder.mutation<IBasket, IBasketQuery>({
      query: ({ productId, quantity = 1 }) => {
        return {
          url: `basket/?productId=${productId}&quantity=${quantity}`,
          body: {},
          method: 'POST',
        };
      },
      invalidatesTags: ['Basket'],
    }),
    removeItem: builder.mutation<any, IBasketQuery>({
      query: ({ productId, quantity = 1 }) => {
        return {
          url: `basket/?productId=${productId}&quantity=${quantity}`,
          method: 'DElETE',
        };
      },
      invalidatesTags: ['Basket'],
    }),
  }),
});

export const { useGetBasketQuery, useLazyGetBasketQuery, useAddItemMutation, useRemoveItemMutation } = basketApi;

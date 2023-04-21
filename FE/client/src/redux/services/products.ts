import { IProduct } from '@/types/products';
import baseApi from './base';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<IProduct, string>({
      query: (id: string) => `products/${id}`,
      providesTags: ['Products'],
    }),
    getAllProducts: builder.query<IProduct[], void>({
      query: () => 'products',
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productApi;

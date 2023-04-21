import { IProduct } from '@/types/products';
import baseApi from './base';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<IProduct, string>({
      query: (id: string) => `products/${id}`,
    }),
    getAllProducts: builder.query<IProduct[], void>({
      query: () => 'products',
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productApi;

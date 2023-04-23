import { IProduct } from '@/types/products';
import baseApi from './base';
import { IProductFilters } from '@/types/productFilters';
import { IFilterParams } from '@/types/filterParams';
import { parseFilter } from '@/utils/parseProductFilter';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<IProduct, string>({
      query: (id: string) => `products/${id}`,
      providesTags: ['Products'],
    }),
    getAllProducts: builder.query<IProduct[], IFilterParams>({
      query: (filterParams) => `products${parseFilter(filterParams)}`,
      providesTags: ['Products'],
    }),
    getProductFilters: builder.query<IProductFilters, void>({
      query: () => 'products/filters',
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetAllProductsQuery, useLazyGetAllProductsQuery, useGetProductQuery, useGetProductFiltersQuery } =
  productApi;

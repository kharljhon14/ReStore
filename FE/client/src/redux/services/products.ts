import { IProduct } from '@/types/products';
import baseApi from './base';
import { IProductFilters } from '@/types/productFilters';
import { IFilterParams } from '@/types/filterParams';
import { parseFilter } from '@/utils/parseProductFilter';
import { IPagination } from '@/types/pagination';
import { isIProduct } from '@/utils/product';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<IProduct, string>({
      query: (id: string) => `products/${id}`,
      providesTags: ['Products'],
    }),
    getAllProducts: builder.query<{ product: IProduct[]; pagination: IPagination }, IFilterParams>({
      query: (filterParams) => `products${parseFilter(filterParams)}`,
      transformResponse: (response, meta): { product: IProduct[]; pagination: IPagination } => {
        if (Array.isArray(response) && isIProduct(response)) {
          const paginationMeta = meta?.response?.headers.get('pagination');

          if (paginationMeta) {
            const pagination = JSON.parse(paginationMeta);
            return { product: response, pagination };
          }
        }
        return { product: [], pagination: {} };
      },
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

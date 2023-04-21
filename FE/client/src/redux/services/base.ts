import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tags = ['Products', 'Basket'];

const baseApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5101/api/', credentials: 'include' }),
  endpoints: () => ({}),
  tagTypes: tags,
});

export default baseApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5101/api/' }),
  endpoints: () => ({}),
});

export default baseApi;

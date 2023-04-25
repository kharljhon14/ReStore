import { ILoginRequest, ILoginResponse } from '@/types/auth';
import baseApi from './base';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => {
        return {
          url: 'account/login',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;

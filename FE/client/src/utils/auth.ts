import { ILoginResponse } from '@/types/auth';

export function isValidToken(token: any): token is ILoginResponse {
  return typeof token?.token === 'string' && typeof token?.email === 'string';
}

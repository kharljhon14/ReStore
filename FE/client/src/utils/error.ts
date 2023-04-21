import { IError } from '@/types/error';

export function isIError(error: any): error is IError {
  return typeof error.title === 'string' && typeof error.status === 'number';
}

export function handleError(error: IError) {
  const { status } = error;

  switch (status) {
    case 404:
      return status;

    case 500:
      return status;
  }
}

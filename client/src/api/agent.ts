import axios, { AxiosError, AxiosResponse } from 'axios';
import { error } from 'console';

axios.defaults.baseURL = 'http://localhost:5101/api/';

const responseBody = (res: AxiosResponse) => res.data;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const catalog = {
  list: () => requests.get('products'),
  details: (id: number) => requests.get(`products/${id}`),
};

const errors = {
  get400Error: () =>
    requests.get('buggy/not-found').catch((err: Error) => {
      throw new Error(err.message);
    }),
  getBadRequest: () => requests.get('buggy/bad-request'),
  getUnauthorised: () => requests.get('buggy/unauthorised'),
  getValidationError: () => requests.get('buggy/validation-error'),
  getServerError: () => requests.get('buggy/server-error'),
};

const agent = {
  catalog,
  errors,
};

export default agent;

import axios, { AxiosError, AxiosResponse } from 'axios';
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
  filters: () => requests.get('products/filters'),
};

const basket = {
  get: () => requests.get('basket'),
  addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const errors = {
  get400Error: () => requests.get('buggy/not-found'),
  getBadRequest: () => requests.get('buggy/bad-request'),
  getUnauthorised: () => requests.get('buggy/unauthorised'),
  getValidationError: () => requests.get('buggy/validation-error'),
  getServerError: () => requests.get('buggy/server-error'),
};

const agent = {
  catalog,
  errors,
  basket,
};

export default agent;

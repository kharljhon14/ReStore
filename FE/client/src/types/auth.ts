import { IBasket } from './basket';

export interface ILoginRequest {
  userName: string;
  password: string;
}

export interface ILoginResponse {
  email: string;
  token: string;
  basket?: IBasket;
}

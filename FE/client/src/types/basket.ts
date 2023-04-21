import { IProduct } from './products';

export interface IBasket {
  id: number;
  userId: string;
  items: IProduct[];
}

export interface IBasketQuery {
  productId: number;
  quantity?: number;
}

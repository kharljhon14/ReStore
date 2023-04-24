import { IProduct } from '@/types/products';

export function isIProduct(products: any[]): products is IProduct[] {
  return products.every((product) => typeof product.id === 'number' && typeof product.name === 'string');
}

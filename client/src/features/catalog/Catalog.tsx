import { IProduct } from '@/types/products';
import ProductList from './ProductList';

interface Props {
  products: IProduct[];
}

export default function Catalog({ products }: Props) {
  return (
    <>
      <ProductList products={products} />
      <h1>insert card</h1>
    </>
  );
}

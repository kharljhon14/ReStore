import { IProduct } from '@/types/products';
import ProductCard from './ProductCard';

interface Props {
  products: IProduct[];
}

export default function ProductList({ products }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-2 px-2">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

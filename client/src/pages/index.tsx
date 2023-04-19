import HeaderNav from '@/components/common/HeaderNav';
import Catalog from '@/features/catalog/Catalog';
import { IProduct } from '@/types/products';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch('http://localhost:5101/api/Products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="space-y-10">
      <HeaderNav />
      <Catalog products={products} />
    </div>
  );
}

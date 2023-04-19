import { IProduct } from '@/types/products';
import Image from 'next/image';
import { BsCartPlus } from 'react-icons/bs';

interface Props {
  product: IProduct;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="flex flex-col border py-5 px-2 min-h-[200px] shadow-md space-y-4 rounded-md">
      <div className="py-3 w-full flex items-center justify-center bg-primary bg-opacity-10 rounded">
        <Image src={product.imageUrl} alt={product.name} width={100} height={100} />
      </div>

      <div className="font-semibold">
        <p className="text-accent text-lg">&#8369;{product.price.toFixed(2)}</p>
        <h2 className="text-sm">{product.name}</h2>
      </div>
      <div>
        <p className="text-sm text-tertiary ">{`${product.brand} / ${product.type}`}</p>
      </div>
    </div>
  );
}

import Button from '@/components/buttons/Button';
import { IProduct } from '@/types/products';
import Image from 'next/image';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

interface Props {
  product: IProduct;
}

export default function CurrentProduct({ product }: Props) {
  return (
    <div className="flex flex-col px-2 h-full">
      <div className="space-y-5">
        <div className="py-3 w-full flex items-center justify-center bg-primary bg-opacity-10 rounded">
          <Image src={product.imageUrl} alt={product.name} width={200} height={100} />
        </div>
        <div className="font-semibold">
          <p className="text-accent text-xl">&#8369;{product.price?.toFixed(2)}</p>
          <h2 className="text-md">{product.name}</h2>
        </div>
        <div>
          <p className="leading-7">{product.description}</p>
        </div>
        <div>
          <p className="text-sm text-tertiary ">{`${product.brand} / ${product.type}`}</p>
        </div>
      </div>
      <div className="flex items-center justify-around mt-14">
        <Button>
          <FiShoppingCart size={20} />
          <p>Add to cart</p>
        </Button>
        <Button>
          <FiHeart size={20} />
          <p>Buy now</p>
        </Button>
      </div>
    </div>
  );
}

import agent from '@/api/agent';
import Button from '@/components/buttons/Button';
import { useAddItemMutation, useGetBasketQuery } from '@/redux/services/bakset';
import { IProduct } from '@/types/products';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface Props {
  product: IProduct;
}

export default function ProductCard({ product }: Props) {
  const [addProduct, { isSuccess, isError, isLoading }] = useAddItemMutation();

  const handleAddItem = () => {
    addProduct({ productId: product.id });
  };

  useEffect(() => {
    if (isSuccess) toast.success('Added to cart!');
    if (isError) toast.error('Something went wrong!');
  }, [isSuccess, isError]);

  return (
    <div className="flex flex-col items-center justify-between h-[350px] border py-5 px-2 rounded-md shadow-md space-y-5">
      <Link className="w-full" href={`/catalog/${product.id}`}>
        <div className="space-y-4">
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
      </Link>
      <Button loading={isLoading} disabled={isLoading} onClick={handleAddItem}>
        <FiShoppingCart size={20} />
        <p>Add to cart</p>
      </Button>
    </div>
  );
}

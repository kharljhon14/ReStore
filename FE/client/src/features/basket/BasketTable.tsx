import Button from '@/components/buttons/Button';
import Loading from '@/components/common/Loading';
import { useRemoveItemMutation } from '@/redux/services/bakset';
import { IBasket } from '@/types/basket';
import { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import BasketSummary from './BasketSummary';

interface Props {
  basket: IBasket;
}

export default function BasketTable({ basket }: Props) {
  const [removeProduct, { isLoading, isSuccess, isError }] = useRemoveItemMutation();

  const handleRemoveItem = (id: number, quantity?: number) => {
    removeProduct({ productId: id, quantity });
  };

  useEffect(() => {
    if (isSuccess) toast.info('Product removed!');
    if (isError) toast.error('Something went wrong!');
  }, [isSuccess, isError]);

  const renderedTableDataProducts = basket.items.map((item) => (
    <tr className="shadow" key={item.productId}>
      <td className="p-5">{item.name}</td>
      <td className="border-r p-5">{item.quantity}</td>
      <td className="p-5 text-accent flex items-center justify-center text-xl">
        <button onClick={() => handleRemoveItem(item.productId, item.quantity)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  ));

  if (basket.items.length <= 0)
    return (
      <div className="flex items-center justify-center h-[80vh] w-full">
        <h1 className="text-2xl">Your cart is empty</h1>
      </div>
    );
  return (
    <div className="flex justify-center flex-col space-y-10">
      <table className="table-auto text-primary w-full">
        <thead>
          <tr className="border-b-2 text-lg uppercase ">
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        {isLoading ? (
          <Loading />
        ) : (
          <tbody>
            {renderedTableDataProducts}
            <BasketSummary products={basket.items} />
          </tbody>
        )}
      </table>
    </div>
  );
}

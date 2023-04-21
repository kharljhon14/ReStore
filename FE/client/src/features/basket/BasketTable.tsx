import Button from '@/components/buttons/Button';
import Loading from '@/components/common/Loading';
import { useRemoveItemMutation } from '@/redux/services/bakset';
import { IBasket } from '@/types/basket';
import { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface Props {
  basket: IBasket;
}

export default function BasketTable({ basket }: Props) {
  const [removeProduct, { isLoading, isSuccess, isError }] = useRemoveItemMutation();

  const handleRemoveItem = (id: number) => {
    removeProduct({ productId: id });
  };

  useEffect(() => {
    if (isSuccess) toast.info('Product removed!');
    if (isError) toast.error('Something went wrong!');
  }, [isSuccess, isError]);

  const renderedTableDataProducts = basket.items.map((item) => (
    <tr className="shadow" key={item.id}>
      <td className="p-5">{item.name}</td>
      <td className="border-r p-5">{item.quantity}</td>
      <td className="p-5 text-accent flex items-center justify-center text-xl">
        <button onClick={() => handleRemoveItem(item.productId)}>
          <FaTrash />
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="flex justify-center">
      <table className="table-auto text-primary w-full">
        <thead>
          <tr className="border-b-2 text-lg uppercase ">
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>{isLoading ? <Loading /> : renderedTableDataProducts}</tbody>
      </table>
    </div>
  );
}

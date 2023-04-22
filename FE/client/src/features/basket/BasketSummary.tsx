import { IProduct } from '@/types/products';
import { current } from '@reduxjs/toolkit';

interface Props {
  products: IProduct[];
}

export default function BasketSummary({ products }: Props) {
  const subTotal = products.reduce((accumulator, current) => accumulator + current.price, 0);
  const deliveryFee = subTotal >= 0 ? 500 : 0;

  const total = subTotal + deliveryFee;

  return (
    <>
      <tr className="text-lg uppercase ">
        <td className="p-5">
          <h2>Subtotal</h2>
        </td>
        <td className="">
          <h2>&#8369;{subTotal}</h2>
        </td>
      </tr>
      <tr className=" text-lg uppercase ">
        <td className="p-5">
          <h2>Delivery</h2>
        </td>
        <td className="">
          <h2>&#8369;{deliveryFee}</h2>
        </td>
      </tr>
      <tr className="border-b-2 text-lg uppercase ">
        <td className="p-5">
          <h2>Total</h2>
        </td>
        <td className="">
          <h2>&#8369;{total}</h2>
        </td>
      </tr>
    </>
  );
}

import Button from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import { IFilterParams } from '@/types/filterParams';
import { IProductFilters } from '@/types/productFilters';
import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { set } from '@/redux/actions';

interface Props {
  filters: IProductFilters;
  handleModal: () => void;
}

export default function FilterModal({ filters, handleModal }: Props) {
  const dispatch = useAppDispatch();
  const { Brands, OrderBy, Types, SearchTerm } = useAppSelector((state) => state.main.productFilter);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const sort = formData.get('OrderBy') as string;
    const brands = formData.getAll('Brands') as string[];
    const types = formData.getAll('Types') as string[];

    const filters: IFilterParams = {
      OrderBy: sort,
      Brands: brands,
      Types: types,
      SearchTerm: SearchTerm,
    };

    dispatch(set(filters));
    handleModal();
  };

  return (
    <div className="fixed text-primary bg-primary bg-opacity-50 left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center p-3">
      <div className="bg-secondary shadow-md flex flex-col overflow-hidden rounded p-5 w-full">
        <button onClick={handleModal} className="self-end text-3xl cursor-pointer">
          <AiOutlineCloseCircle />
        </button>
        <form onSubmit={handleSubmit}>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Sort</h1>
            <Input
              name="OrderBy"
              id="alaphabetical"
              type="radio"
              label="Alphabetical"
              value=""
              defaultChecked={OrderBy === '' || OrderBy === undefined}
            />
            <Input
              name="OrderBy"
              id="price"
              type="radio"
              label="Price - High to low"
              value="price"
              defaultChecked={OrderBy === 'price'}
            />
            <Input
              name="OrderBy"
              id="priceDesc"
              type="radio"
              label="Price - Low to high"
              value="priceDesc"
              defaultChecked={OrderBy === 'priceDesc'}
            />
          </div>
          <div className="bg-primary w-full h-[1px] my-3"></div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Brands</h1>
            {filters.brands.map((brand) => (
              <Input
                key={brand}
                name="Brands"
                id={brand}
                type="checkbox"
                label={brand}
                value={brand}
                defaultChecked={Brands?.includes(brand)}
              />
            ))}
          </div>
          <div className="bg-primary w-full h-[1px] my-3"></div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Types</h1>
            {filters.types.map((type) => (
              <Input
                key={type}
                name="Types"
                id={type}
                type="checkbox"
                label={type}
                value={type}
                defaultChecked={Types?.includes(type)}
              />
            ))}
          </div>
          <Button className="float-right">Filter</Button>
        </form>
      </div>
    </div>
  );
}

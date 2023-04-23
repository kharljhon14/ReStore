import agent from '@/api/agent';
import FilterModal from '@/features/catalog/FilterModal';
import ProductList from '@/features/catalog/ProductList';
import Container from '@/layouts/Container';
import { IProductFilters } from '@/types/productFilters';
import { IProduct } from '@/types/products';
import Button from '@/components/buttons/Button';
import { MdFilterAlt } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import { useGetAllProductsQuery, useLazyGetAllProductsQuery } from '@/redux/services/products';
import { set } from '@/redux/actions';
import { IFilterParams } from '@/types/filterParams';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

import { toast } from 'react-toastify';
import Loading from '@/components/common/Loading';
import Input from '@/components/inputs/Input';

interface Props {
  products: IProduct[];
  filters: IProductFilters;
}

export default function Catalog({ products, filters }: Props) {
  const [productData, setProductData] = useState<IProduct[]>(products);

  const [modalOpen, setModalOpen] = useState(false);
  const [getFilteredProduct, { data, isLoading, isSuccess, isError }] = useLazyGetAllProductsQuery();

  const dispatch = useAppDispatch();
  const productFilter = useAppSelector((state) => state.main.productFilter);
  const [searchValue, setSearchValue] = useState(productFilter.SearchTerm ?? '');

  useEffect(() => {
    getFilteredProduct(productFilter);
  }, [getFilteredProduct, productFilter]);

  useEffect(() => {
    if (isSuccess && data) setProductData(data);

    if (isError) toast.error('Something went worng!');
  }, [isSuccess, isError, data]);
  const handleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const handleKeyPress = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();

      const filters: IFilterParams = {
        ...productFilter,
        SearchTerm: searchValue,
      };

      dispatch(set(filters));
      evt.currentTarget.blur();
    }
  };

  return (
    <Container>
      <div className="p-3 flex items-center justify-around">
        <form>
          <Input
            className="border py-3 px-4 rounded-md"
            name="SearchParam"
            id=""
            type="input"
            placeholder="Search"
            onKeyDown={handleKeyPress}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        <Button onClick={handleModal} className="bg-tertiary">
          <MdFilterAlt />
          <span>Filter</span>
        </Button>
      </div>
      {isLoading ? <Loading /> : <ProductList products={productData} />}
      {modalOpen && <FilterModal handleModal={handleModal} filters={filters} />}
    </Container>
  );
}

export async function getServerSideProps() {
  const products = await agent.catalog.list().catch((error) => console.log(error));

  if (!products)
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };

  const filters = await agent.catalog.filters();

  return {
    props: { products, filters },
  };
}

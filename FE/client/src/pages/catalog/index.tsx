import agent from '@/api/agent';
import FilterModal from '@/features/catalog/FilterModal';
import ProductList from '@/features/catalog/ProductList';
import Container from '@/layouts/Container';
import { IProductFilters } from '@/types/productFilters';
import { IProduct } from '@/types/products';
import Button from '@/components/buttons/Button';
import { MdFilterAlt } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useGetAllProductsQuery, useLazyGetAllProductsQuery } from '@/redux/services/products';
import { set } from '@/redux/actions';
import { IFilterParams } from '@/types/filterParams';
import { useAppSelector } from '@/hooks/redux';
import { parseFilter } from '@/utils/parseProductFilter';

interface Props {
  products: IProduct[];
  filters: IProductFilters;
}

export default function Catalog({ products, filters }: Props) {
  const [productData, setProductData] = useState<IProduct[]>(products);

  const [modalOpen, setModalOpen] = useState(false);
  const [getFilteredProduct, { data, isLoading, isSuccess, isError }] = useLazyGetAllProductsQuery();

  const productFilter = useAppSelector((state) => state.main.productFilter);

  useEffect(() => {
    getFilteredProduct(productFilter);
  }, [getFilteredProduct, productFilter]);

  useEffect(() => {
    if (isSuccess && data) setProductData(data);

    if (isError) console.log('ERROR');
  }, [isSuccess, isError, data]);
  const handleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <Container>
      <div className="p-3 flex justify-end">
        <Button onClick={handleModal} className="bg-tertiary">
          <MdFilterAlt />
          <span>Filter</span>
        </Button>
      </div>
      <ProductList products={productData} />
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

import { IProduct } from '@/types/products';
import ProductList from '@/features/catalog/ProductList';
import Container from '@/layouts/Container';
import { NextPageContext } from 'next';
import agent from '@/api/agent';

interface Props {
  products: IProduct[];
}

export default function Catalog({ products }: Props) {
  return (
    <Container>
      <ProductList products={products} />
    </Container>
  );
}

export async function getServerSideProps() {
  try {
    const products = await agent.catalog.list();

    return {
      props: { products },
    };
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
}

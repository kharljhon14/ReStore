import agent from '@/api/agent';
import ProductList from '@/features/catalog/ProductList';
import Container from '@/layouts/Container';
import { IProduct } from '@/types/products';

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
  const products = await agent.catalog.list();

  if (!products)
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };

  return {
    props: { products },
  };
}

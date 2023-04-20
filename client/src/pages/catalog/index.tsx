import { IProduct } from '@/types/products';
import ProductList from '@/features/catalog/ProductList';
import Container from '@/layouts/Container';
import { NextPageContext } from 'next';

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

export async function getServerSideProps(context: NextPageContext) {
  try {
    const response = await fetch('http://localhost:5101/api/Products');
    const products = await response.json();
    return {
      props: { products },
    };
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
}

import { IProduct } from '@/types/products';
import Container from '@/layouts/Container';
import { NextPageContext } from 'next';
import CurrentProduct from '@/features/catalog/CurrentProduct';

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  return (
    <Container>
      <CurrentProduct product={product} />
    </Container>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    const { query } = context;

    const response = await fetch(`http://localhost:5101/api/Products/${query.id}`);
    const product = await response.json();
    return {
      props: { product },
    };
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
  }
}

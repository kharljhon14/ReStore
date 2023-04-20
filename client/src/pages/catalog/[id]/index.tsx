import { IProduct } from '@/types/products';
import Container from '@/layouts/Container';
import { NextPageContext } from 'next';
import CurrentProduct from '@/features/catalog/CurrentProduct';
import agent from '@/api/agent';
import { error } from 'console';

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
  const { id } = context.query;

  if (!id) throw new Error('Invalid Id');

  const product = await agent.catalog.details(+id).catch((error) => console.log(error));

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
  };
}

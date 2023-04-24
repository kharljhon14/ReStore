import Container from '@/layouts/Container';
import CurrentProduct from '@/features/catalog/CurrentProduct';

import { useGetProductQuery } from '@/redux/services/products';
import { useRouter } from 'next/router';
import Loading from '@/components/common/Loading';

export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const productId = typeof id === 'string' ? id : '';

  const { data: product, isLoading, isError } = useGetProductQuery(productId);

  if (isLoading) return <Loading />;

  // Todo update error handling
  if (isError) {
    router.push('/404');
  }

  return <Container>{product && <CurrentProduct product={product} />}</Container>;
}

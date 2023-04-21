import Loading from '@/components/common/Loading';
import BasketTable from '@/features/basket/BasketTable';
import Container from '@/layouts/Container';
import { useGetBasketQuery } from '@/redux/services/bakset';

export default function Basket() {
  const { data: basket, isLoading } = useGetBasketQuery();

  if (isLoading) return <Loading />;

  return <Container>{basket && <BasketTable basket={basket} />}</Container>;
}

import Loading from '@/components/common/Loading';
import BasketTable from '@/features/basket/BasketTable';
import Container from '@/layouts/Container';
import { useLazyGetBasketQuery } from '@/redux/services/bakset';
import { getCookie } from '@/utils/cookies';
import { useEffect } from 'react';

export default function Basket() {
  const [getBasket, { data: basket, isLoading }] = useLazyGetBasketQuery();

  useEffect(() => {
    const user = getCookie('userId');

    if (!user) return;

    getBasket();
  }, [getBasket]);

  if (!basket)
    return (
      <Container>
        <h1>Your Basket is empty</h1>
      </Container>
    );

  return <Container>{isLoading ? <Loading /> : <BasketTable basket={basket} />}</Container>;
}

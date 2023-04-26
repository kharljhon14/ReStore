import withAuth from '@/decorators/withAuth';
import ErrorButtons from '@/features/errors';
import { useAppSelector } from '@/hooks/redux';
import Container from '@/layouts/Container';

export default withAuth(function Test() {
  const token = useAppSelector((state) => state.main.auth.token);

  return (
    <Container>
      <ErrorButtons />
      <h1>{token}</h1>
    </Container>
  );
});

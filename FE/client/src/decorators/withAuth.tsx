/* eslint-disable react/display-name */
import Loading from '@/components/common/Loading';
import { useAppDispatch } from '@/hooks/redux';
import Container from '@/layouts/Container';
import { setUser } from '@/redux/actions';
import { useLazyGetCurrentUserQuery } from '@/redux/services/auth';
import { isValidToken } from '@/utils/auth';
import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';

export default function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  return function (props: P) {
    const [getUser, { data: user, isSuccess, isError }] = useLazyGetCurrentUserQuery();

    const router = useRouter();

    const dispatch = useAppDispatch();

    useEffect(() => {
      const userToken = localStorage.getItem('user');

      if (!userToken) router.push('/auth');
      else {
        const token = JSON.parse(userToken);

        if (!isValidToken(token)) router.push('/auth');
        else getUser(token.token);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (isError) {
        router.push('/auth');
      }

      if (isSuccess && user) {
        dispatch(setUser(user));
        router.push('/catalog');
      }
    }, [dispatch, isError, isSuccess, router, user]);

    return <WrappedComponent {...props} />;
  };
}

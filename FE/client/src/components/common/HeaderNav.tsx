import { ClOSE_HEIGHT, OPEN_HEIGHT } from '@/constants';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { BsBook, BsInfoCircle } from 'react-icons/bs';
import { BiLogIn } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import { FiShoppingCart } from 'react-icons/fi';
import { useLazyGetBasketQuery } from '@/redux/services/bakset';
import MoonLoader from 'react-spinners/MoonLoader';
import { getCookie } from '@/utils/cookies';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { signOutUser } from '@/redux/actions';
import { useRouter } from 'next/router';

export default function HeaderNav() {
  const [getBasket, { data: basket, isSuccess, isLoading }] = useLazyGetBasketQuery();

  const token = useAppSelector((state) => state.main.auth.token);
  const dispatch = useAppDispatch();

  const { push } = useRouter();

  useEffect(() => {
    const user = getCookie('userId');

    if (!user) return;

    getBasket();
  }, [getBasket, basket]);

  const [open, setOpen] = useState(false);

  const handleNav = () => {
    setOpen((prev) => !prev);
  };

  const basketOrLoading = (
    <Link href="/basket" className="relative">
      {isLoading ? (
        <MoonLoader size={25} color="#FCF5E5" />
      ) : (
        <span className="absolute -top-2 -right-4 text-sm font-normal">
          <span className="bg-accent w-6 h-6 rounded-full flex items-center justify-center">
            {isSuccess ? basket?.items.length : '0'}
          </span>
        </span>
      )}

      <FiShoppingCart />
    </Link>
  );

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(signOutUser());
    push('/auth');
  };

  return (
    <nav className="bg-primary py-4 px-5 flex flex-col items-center justify-between bg-gradient-to-tr shadow-md absolute left-0 right-0">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl text-neutral">ReStore</h1>
        <div className="flex text-neutral text-3xl space-x-10">
          {basketOrLoading}
          <button onClick={handleNav}>
            <CiMenuFries />
          </button>
        </div>
      </div>

      <div
        className="text-neutral flex flex-col items-center justify-evenly space-y-8  overflow-hidden uppercase text-xl w-full transition-height duration-300"
        style={{ height: open ? OPEN_HEIGHT : ClOSE_HEIGHT }}
      >
        <div>
          <Link className="flex items-center space-x-2" href="/catalog">
            <BsBook />
            <span>Catalog</span>
          </Link>
        </div>
        <div>
          <Link className="flex items-center space-x-2" href="/">
            <BsInfoCircle />
            <span>About</span>
          </Link>
        </div>
        <div>
          <Link className="flex items-center space-x-2" href="/">
            <HiOutlineMail />
            <span>Contact</span>
          </Link>
        </div>
        <div>
          {token !== '' ? (
            <a className="flex items-center space-x-2 cursor-pointer" onClick={handleLogout}>
              <BiLogIn />
              <span>Sign out</span>
            </a>
          ) : (
            <Link className="flex items-center space-x-2" href="/auth">
              <BiLogIn />
              <span>Sign in</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

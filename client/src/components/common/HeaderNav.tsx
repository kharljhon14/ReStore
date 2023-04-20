import { ClOSE_HEIGHT, OPEN_HEIGHT } from '@/constants';
import Link from 'next/link';
import { useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { BsBook, BsInfoCircle } from 'react-icons/bs';
import { BiLogIn } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';

export default function HeaderNav() {
  const [open, setOpen] = useState(false);

  const handleNav = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav className="bg-primary py-4 px-5 flex flex-col items-center justify-between bg-gradient-to-tr shadow-md">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl text-neutral">ReStore</h1>
        <button onClick={handleNav} className="text-neutral text-3xl">
          <CiMenuFries />
        </button>
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
          <Link className="flex items-center space-x-2" href="/">
            <BiLogIn />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

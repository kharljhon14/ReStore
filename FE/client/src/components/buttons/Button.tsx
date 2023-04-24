import { MouseEventHandler, ReactNode } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import classnames from 'classnames';

const baseStyle =
  'text-secondary font-semibold flex items-center space-x-2 bg-primary justify-center py-3 px-4 uppercase rounded hover:scale-105 duration-300 active:scale-100 focus:duration-75 disabled:bg-tertiary disabled:cursor-not-allowed disabled:hover:scale-100';

interface Props {
  children?: ReactNode | ReactNode[];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function Button({ children, onClick, disabled, className, loading }: Props) {
  const combinedClassNames = classnames(baseStyle, className);
  return (
    <button onClick={onClick} disabled={disabled} className={combinedClassNames}>
      {loading ? <MoonLoader size={20} color="#FCF5E5" /> : children}
    </button>
  );
}

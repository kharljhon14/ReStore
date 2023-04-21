import { MouseEventHandler, ReactNode } from 'react';
import classnames from 'classnames';

const baseStyle =
  'text-secondary font-semibold flex items-center space-x-2 bg-primary justify-center py-3 px-4 uppercase rounded hover:scale-105 duration-300 active:scale-100 focus:duration-75';

interface Props {
  children?: ReactNode | ReactNode[];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

export default function Button({ children, onClick, disabled, className }: Props) {
  const combinedClassNames = classnames(baseStyle, className);
  return (
    <button onClick={onClick} disabled={disabled} className={combinedClassNames}>
      {children}
    </button>
  );
}

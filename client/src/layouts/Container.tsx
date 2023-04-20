import HeaderNav from '@/components/common/HeaderNav';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode | ReactNode[];
}

export default function Container({ children }: Props) {
  return (
    <div className="h-screen">
      <HeaderNav />
      {children}
    </div>
  );
}

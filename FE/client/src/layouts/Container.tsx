import HeaderNav from '@/components/common/HeaderNav';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode | ReactNode[];
}

export default function Container({ children }: Props) {
  return (
    <div className="h-screen">
      <HeaderNav />
      <div className="pt-20">{children}</div>
    </div>
  );
}

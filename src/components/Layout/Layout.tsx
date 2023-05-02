import { FC, ReactNode } from 'react';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/router';

interface layoutProps {
  children: ReactNode,
}

const Layout: FC<layoutProps> = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <>
      <Header />
      <div className={`${pathname === '/' ? 'bg-white' : ''}`}>
        {children}
      </div>
    </>
  );
};

export default Layout;

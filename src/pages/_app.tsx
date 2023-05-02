import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout/Layout';

const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <main
      className='flex max-w-7xl m-auto min-h-screen flex-col items-center justify-between p-10 max-[480px]:p-4'>
      <Component {...pageProps} />
    </main>
  </Layout>
);

export default App;

import '../scss/global.scss';
import Head from 'next/head';
import Navbar from '../components/Navbar';

import { ThemePreference } from '../components/ThemePreference';
import { useRouter } from 'next/router';

const _app = ({ Component, pageProps }) => {

  const router = useRouter();

  return (<>
    <Head>
      <title>FallenAngel HR</title>
    </Head>
    < Navbar />
    <ThemePreference>
      <Component {...pageProps} />
    </ThemePreference>
  </>);
}

export default _app;

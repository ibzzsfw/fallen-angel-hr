import Head from 'next/head';
import Navbar from '../components/Navbar';
import '../scss/global.scss';

import { useRouter } from 'next/router';
import { ThemePreference } from '../components/ThemePreference';

const _app = ({ Component, pageProps }) => {
  return (
    <div>
      <Head>
        <title>FallenAngel HR</title>
      </Head>
      <ThemePreference>
        < Navbar />
        <Component {...pageProps} />
      </ThemePreference>
    </div>
  );
}

export default _app;

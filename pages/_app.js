import React from 'react';
import '../scss/global.scss';
import Head from 'next/head';
import Navbar from '../components/Navbar';

import { ThemePreference } from '../components/ThemePreference';
import { useRouter } from 'next/router';

const _app = ({ Component, pageProps }) => {

  const router = useRouter();

  return (
    <div>
      <Head>
        <title>FallenAngel HR</title>
      </Head>
      < Navbar />
      <ThemePreference>
        <Component {...pageProps} />
      </ThemePreference>
    </div>
  );
}

export default _app;

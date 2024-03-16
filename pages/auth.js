import React, { Fragment } from 'react';
import Head from 'next/head';
import Auth from '../components/auth/Auth';

function auth() {
  return (
    <Fragment>
      <Head>
        <title>Auth</title>
      </Head>
      <Auth />
    </Fragment>
  );
}

export default auth;

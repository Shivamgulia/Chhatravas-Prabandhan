import React, { Fragment } from 'react';
import Head from 'next/head';
import Login from '../components/auth/Login';

function auth() {
  return (
    <Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </Fragment>
  );
}

export default auth;

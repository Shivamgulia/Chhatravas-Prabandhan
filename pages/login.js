import React, { Fragment } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Login from '../components/auth/Login';

function auth() {
  const session = useSession();
  console.log(session);
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

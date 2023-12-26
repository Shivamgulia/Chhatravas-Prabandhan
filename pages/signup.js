import Signup from '@/components/auth/Signup';
import Head from 'next/head';
import React, { Fragment } from 'react';

function signup() {
  return (
    <Fragment>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Signup />
    </Fragment>
  );
}

export default signup;

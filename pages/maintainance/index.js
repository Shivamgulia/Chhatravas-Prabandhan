import React, { useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import Link from 'next/link';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function maintainance() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(session.data?.user);
    if (session.status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session]);
  return (
    <Layout>
      issue
      <div style={{ color: 'black' }}>
        <Link href='/maintainance/raise'>Raise a Request</Link>
      </div>
    </Layout>
  );
}

export default maintainance;

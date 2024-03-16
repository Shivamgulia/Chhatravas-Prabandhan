import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout/Layout';
import RaiseIssue from '@/components/Forms/RaiseIssue';

function raise() {
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
      <RaiseIssue />
    </Layout>
  );
}

export default raise;

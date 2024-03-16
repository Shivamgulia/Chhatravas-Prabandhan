import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import WardenHome from '@/components/main/WardenHome';
import Layout from '@/components/Layout/Layout';

function warden() {
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
      <WardenHome />
    </Layout>
  );
}

export default warden;

import React, { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import EmployeeList from '@/components/main/EmployeeList';
import Layout from '@/components/Layout/Layout';

function employee() {
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
      <EmployeeList />
    </Layout>
  );
}

export default employee;

import Layout from '@/components/Layout/Layout';
import Link from 'next/link';
import React from 'react';

function maintainance() {
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

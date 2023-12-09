import Head from 'next/head';

import Layout from '../components/Layout/Layout';
import Dashboard from '../components/main/Dashboard';

import { Commissioner } from 'next/font/google';

import styles from '../styles/Index.module.css';

const inter = Commissioner({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>DashBoard</title>
      </Head>
      <Layout>
        <div className={`${styles.cont} ${inter.className}`}>
          <Dashboard />
        </div>
      </Layout>
    </>
  );
}

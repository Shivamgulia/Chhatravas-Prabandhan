import { useEffect } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Layout from "../components/Layout/Layout";
import Dashboard from "../components/main/Dashboard";

import { Commissioner } from "next/font/google";

import styles from "../styles/Index.module.css";

const inter = Commissioner({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session.data?.user);
    if (session.status === "unauthenticated") {
      router.push("/login");
    } else if (
      session.status === "authenticated" &&
      !session.data.user.user.hostel
    ) {
      router.push("/profile");
    }
  }, [session]);

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

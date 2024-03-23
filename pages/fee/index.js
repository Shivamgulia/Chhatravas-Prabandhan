import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout/Layout";
import FeeSubmit from "@/components/main/Fee/FeeSubmit";

export default function index() {
  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    } else if (
      session.status === "authenticated" &&
      !session.data.user.user.hostel
    ) {
      router.push("/profile");
    }
  }, [session.status]);
  return (
    <Layout>
      <FeeSubmit />
    </Layout>
  );
}

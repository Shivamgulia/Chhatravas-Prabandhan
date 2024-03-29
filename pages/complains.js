import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import ComplainList from "../components/main/Complain/ComplainList";
import Layout from "@/components/Layout/Layout";

function complains() {
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
  }, [session]);
  return (
    <Layout>
      <ComplainList />
    </Layout>
  );
}

export default complains;

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Layout from "@/components/Layout/Layout";
import Notice from "@/components/main/Notice";

function newnotice() {
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
      <Notice />
    </Layout>
  );
}

export default newnotice;

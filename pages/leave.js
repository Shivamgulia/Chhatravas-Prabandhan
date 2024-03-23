import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import LeaveForm from "@/components/Forms/LeaveForm";
import Layout from "@/components/Layout/Layout";

function leave() {
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
      <LeaveForm />
    </Layout>
  );
}

export default leave;

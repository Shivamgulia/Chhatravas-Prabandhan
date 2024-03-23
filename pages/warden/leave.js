import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout/Layout";
import LeaveList from "../../components/main/Warden/LeaveList";

function leave() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(session.data?.user);
    if (session.status === "unauthenticated") {
      router.push("/login");
    } else if (
      session.status === "authenticated" &&
      !session.data.user.user.hostel &&
      session.data.user.user.rollno != 0
    ) {
      router.push("/profile");
    }
  }, [session]);
  return (
    <Layout>
      <LeaveList />
    </Layout>
  );
}

export default leave;

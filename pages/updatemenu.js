import Layout from "@/components/Layout/Layout";
import React, { useEffect } from "react";

import Menu from "@/components/main/Mess/Menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function UpdateMenu() {
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
      <Menu />
    </Layout>
  );
}

export default UpdateMenu;

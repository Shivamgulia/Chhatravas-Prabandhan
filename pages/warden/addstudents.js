import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import FileUploadForm from "@/components/main/Warden/FileUploadForm";
import Layout from "@/components/Layout/Layout";

function addstudents() {
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
    } else if (
      session.status === "authenticated" &&
      session.data.user.user.rollno != 0
    ) {
      router.push("/profile");
    }
  }, [session]);
  return (
    <Layout>
      <FileUploadForm />
    </Layout>
  );
}

export default addstudents;

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import styles from "../../styles/List/LeaveList.module.css";

function LeaveList() {
  const session = useSession();

  const [leaves, setLeaves] = useState([]);

  async function getLeaves() {
    const res = await fetch("/api/v1/leave/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: session.data.user.token,
      },
      body: JSON.stringify({
        rollno: session.data.user.user.rollno,
        hostel: session.data.user.user.hostel,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setLeaves(data.leaves);
    } else {
      alert("Failed Fetch");
    }
  }

  useEffect(() => {
    if (session.status === "authenticated") {
      getLeaves();
    }
  }, [session]);
  return (
    <div className={`${styles.cont}`}>
      <div className={`${styles.table}`}>
        <div className={`${styles.head}`}>
          <h3 className={`${styles.headItem}`}>Reason</h3>
          <h3 className={`${styles.headItem}`}>Start Date</h3>
          <h2 className={`${styles.headItem}`}>Status</h2>
        </div>
        <div className={`${styles.tbody}`}>
          {leaves.map((item) => {
            return (
              <div className={`${styles.body}`}>
                <h3 className={`${styles.bodyItem}`}>{item.reason}</h3>
                <h3 className={`${styles.bodyItem}`}>
                  {item.startdate.split("T", 1)}
                </h3>
                <h3 className={`${styles.bodyItem}`}>{item.status}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LeaveList;

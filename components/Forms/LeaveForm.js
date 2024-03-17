import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import styles from "../../styles/Forms/LeaveForm.module.css";

function LeaveForm() {
  const session = useSession();

  const [name, setName] = useState();
  const [rollno, setRollNo] = useState();

  useEffect(() => {
    if (session.status === "authenticated") {
      setName(session.data.user.user.name);
      setRollNo(session.data.user.user.rollno);
    }
  }, [session.status]);

  async function submitionHandler(e) {
    e.preventDefault();

    const form = e.target;
    const formEntries = new FormData(form);
    const formObj = Object.fromEntries(formEntries);
    console.log(formObj);

    const res = await fetch("/api/v1/leave/raise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: session.data.user.token,
      },
      body: JSON.stringify({
        ...formObj,
        hostel: session.data.user.user.hostel,
      }),
    });

    if (res.ok) {
      alert("Application Sent");
    } else {
      alert("Application Failed");
    }
  }

  return (
    <div className={`${styles.cont}`}>
      LeaveForm
      <form className={`${styles.form}`} onSubmit={submitionHandler}>
        <div className={`${styles.inputDiv}`}>
          <label className={`${styles.label}`}>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            className={`${styles.input}`}
          />
        </div>
        <div className={`${styles.inputDiv}`}>
          <label className={`${styles.label}`}>Rollno</label>
          <input
            type="text"
            name="rollno"
            value={rollno}
            className={`${styles.input}`}
          />
        </div>
        <div className={`${styles.inputDiv}`}>
          <label className={`${styles.label}`}>Reason</label>
          <input
            type="text"
            name="reason"
            className={`${styles.input}`}
            required
          />
        </div>
        <div className={`${styles.inputDiv}`}>
          <label className={`${styles.label}`}>From Date</label>
          <input
            type="date"
            name="startdate"
            className={`${styles.input}`}
            required
          />
        </div>
        <div className={`${styles.inputDiv}`}>
          <label className={`${styles.label}`}>To Date</label>
          <input
            type="date"
            name="enddate"
            className={`${styles.input}`}
            required
          />
        </div>
        <button className={`${styles.button}`}>Raise Leave Application</button>
      </form>
    </div>
  );
}

export default LeaveForm;

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import styles from "../../styles/Forms/RaiseIssue.module.css";

function RaiseIssue() {
  const session = useSession();

  const [roomNo, setRoomNo] = useState();
  const [raiser, setRaiser] = useState();
  const [hostel, setHostel] = useState();

  useEffect(() => {
    if (session.data && session.data.user.user) {
      if (session.data.user.user) {
        setHostel(session.data.user.user.hostel);
        setRaiser(session.data.user.user.name);
        setRoomNo(session.data.user.user.roomno);
      }
    }
  }, [session]);

  async function handleSubmit(event) {
    event.preventDefault();
    const description = event.target[2].value;
    const issue = event.target[3].value;

    if (session.data && session.data.user.user) {
      if (session.data.user.token) {
        console.log(session.data.user.token);
        const res = await fetch("/api/v1/maintainance/raise", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + session.data.user.token,
          },
          body: JSON.stringify({ roomNo, raiser, description, issue, hostel }),
        });
        const data = await res.json();
        console.log(data);
      }
    }
  }

  return (
    <div className={`${styles.cont}`}>
      <h1 className={`${styles.heading}`}>Raise Issue</h1>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className={`${styles.inputDiv}`}>
          <label htmlFor="" className={`${styles.label}`}>
            room_no
          </label>
          <input
            type="number"
            className={`${styles.input}`}
            value={roomNo}
            contentEditable={false}
            required
          />
        </div>
        <div className={`${styles.inputDiv}`}>
          <label htmlFor="" className={`${styles.label}`}>
            raiser
          </label>
          <input
            type="text"
            className={`${styles.input}`}
            value={raiser}
            contentEditable={false}
            required
          />
        </div>
        <div className={`${styles.inputDiv}`}>
          <label htmlFor="" className={`${styles.label}`}>
            description
          </label>
          <input type="text" className={`${styles.input}`} required />
        </div>
        <div className={`${styles.inputDiv}`}>
          <label htmlFor="" className={`${styles.label}`}>
            issue
          </label>
          <input type="text" className={`${styles.input}`} required />
        </div>

        <button className={`${styles.button}`}>Raise Issue</button>
      </form>
    </div>
  );
}

export default RaiseIssue;

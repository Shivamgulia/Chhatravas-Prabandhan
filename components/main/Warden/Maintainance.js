import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import styles from "@/styles/main/Warden/Maintainance.module.css";

function Maintainance() {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [maintainance, setMaintainance] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  async function fetchMaintainance() {
    setLoading(true);
    if (session.data && session.data.user.user) {
      const hostel = await session.data.user.user.hostel;
      if (session.data.user.token) {
        const response = await fetch("/api/v1/maintainance", {
          method: "POST",
          headers: {
            authorization: `Bearer ${session.data.user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page, hostel }),
        });

        if (!response.ok) {
          console.log("Error");
        } else {
          const data = await response.json();
          setMaintainance(data.maintainance);
          setPages(data.pages);
          console.log(data);
        }
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if (session.status === "authenticated") fetchMaintainance();
  }, [page, session]);

  return (
    <div className={`${styles.cont}`}>
      <table className={`${styles.list}`}>
        <thead>
          <tr className={`${styles.headings}`}>
            <th className={`${styles.head}`}>Name</th>
            <th className={`${styles.head}`}>Room No</th>
            <th className={`${styles.head}`}>Issue</th>
            <th className={`${styles.head}`}>Descreption</th>
            <th className={`${styles.head}`}>Issue Date</th>
            <th className={`${styles.head}`}>Status</th>
          </tr>
        </thead>
        <tbody>
          {maintainance.map((item) => {
            console.log(item);
            return (
              <tr key={item.id} className={`${styles.item}`}>
                <td>{item.raiser}</td>
                <td>{item.room_no}</td>
                <td>{item.issue}</td>
                <td>{item.description}</td>
                <td>{item.issue_date}</td>
                <td>{item.status === 1 ? "Active" : "Resolved"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {pages > 1 && (
        <div className={`${styles.btns}`}>
          <button
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
            className={`${styles.btn}`}
          >
            prev
          </button>
          <button
            onClick={() => {
              if (pages < page) setPage(page + 1);
            }}
            className={`${styles.btn}`}
          >
            next
          </button>
        </div>
      )}
    </div>
  );
}

export default Maintainance;

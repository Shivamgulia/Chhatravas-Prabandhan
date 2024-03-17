import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import styles from "@/styles/main/Warden/StudentList.module.css";
import Modal from "@/components/modal/Modal";

function StudentList() {
  const session = useSession();

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [leave, setLeave] = useState({});

  useEffect(() => {
    if (session.status === "authenticated") getStudents();
  }, [page, session]);

  async function getStudents() {
    if (session.data && session.data.user.user) {
      const hostel = await session.data.user.user.hostel;
      if (session.data.user.token) {
        const response = await fetch("/api/v1/leave", {
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
          setPages(data.pages);
          setLeaves(data.leaves);
          console.log(data);
        }
      }
    }
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className={`${styles.cont}`}>
      <Modal isOpen={showModal} onClose={closeModal}>
        <h1>Leave</h1>
        <h2>{leave.applicant}</h2>
        <h2>{leave.reason}</h2>
        <h2>{leave.startdate}</h2>
        <h2>{leave.enddate}</h2>
        <form>
          <input type="text" />
          <button type="submit"></button>
        </form>
      </Modal>
      <table className={`${styles.list}`}>
        <thead>
          <tr className={`${styles.headings}`}>
            <th className={`${styles.head}`}>Name</th>
            <th className={`${styles.head}`}>Roll No.</th>
            <th className={`${styles.head}`}>Reason</th>
            <th className={`${styles.head}`}>From</th>
            <th className={`${styles.head}`}>To</th>
          </tr>
        </thead>
        {/* <tbody> */}
        {leaves.map((item) => {
          console.log(item);
          return (
            <tr
              key={item.id}
              className={`${styles.item}`}
              onClick={() => {
                setLeave(item);
                setShowModal(true);
              }}
            >
              <td>{item.applicant}</td>
              <td>{item.rollno}</td>
              <td>{item.reason}</td>
              <td>{item.startdate}</td>
              <td>{item.enddate}</td>
            </tr>
          );
        })}
        {/* </tbody> */}
      </table>
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
            if (pages > page) {
              setPage(page + 1);
            }
          }}
          className={`${styles.btn}`}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default StudentList;

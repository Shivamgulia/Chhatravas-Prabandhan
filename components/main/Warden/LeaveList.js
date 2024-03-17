import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import styles from "@/styles/main/Warden/LeaveList.module.css";
import Modal from "@/components/modal/Modal";

function LeaveList() {
  const session = useSession();

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [leave, setLeave] = useState({});

  useEffect(() => {
    if (session.status === "authenticated") getLeaves();
  }, [page, session]);

  async function getLeaves() {
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
        } else {
          const data = await response.json();
          setPages(data.pages);
          setLeaves(data.leaves);
        }
      }
    }
  }

  async function updateLeave(e) {
    e.preventDefault();
    const form = e.target;
    const formEntries = new FormData(form);
    const formObj = Object.fromEntries(formEntries);
    const reqObj = { id: leave.id, status: formObj.status };

    const res = fetch("/api/v1/leave/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: session.data.user.token,
      },
      body: JSON.stringify(reqObj),
    });
    getLeaves();
    closeModal();
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className={`${styles.cont}`}>
      <Modal isOpen={showModal} onClose={closeModal}>
        <div className={`${styles.modalCont}`}>
          <h1 className={`${styles.formHead}`}>Leave</h1>
          <form className={`${styles.form}`} onSubmit={updateLeave}>
            <div className={`${styles.inputDiv}`}>
              <label className={`${styles.label}`}>Applicant</label>
              <input
                type="text"
                className={`${styles.input}`}
                value={leave.applicant}
                readOnly
              />
            </div>
            <div className={`${styles.inputDiv}`}>
              <label className={`${styles.label}`}>Reason</label>
              <input
                type="text"
                className={`${styles.input}`}
                value={leave.reason}
                readOnly
              />
            </div>
            <div className={`${styles.inputDiv}`}>
              <label className={`${styles.label}`}>From</label>
              <input
                type="text"
                className={`${styles.input}`}
                value={leave.startdate}
                readOnly
              />
            </div>
            <div className={`${styles.inputDiv}`}>
              <label className={`${styles.label}`}>To</label>
              <input
                type="text"
                className={`${styles.input}`}
                value={leave.enddate}
                readOnly
              />
            </div>
            <div className={`${styles.inputDiv}`}>
              <label className={`${styles.label}`}>Status</label>
              <select className={`${styles.input}`} name="status">
                <option value="Pending">Pending</option>
                <option value="Approved">Approve</option>
                <option value="Rejected">Reject</option>
              </select>
            </div>
            <button type="submit" className={`${styles.button}`}>
              Update Status
            </button>
          </form>
        </div>
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
        <tbody>
          {leaves.map((item) => {
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
        </tbody>
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

export default LeaveList;

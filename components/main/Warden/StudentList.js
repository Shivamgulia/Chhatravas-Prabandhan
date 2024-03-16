import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import styles from '@/styles/main/Warden/StudentList.module.css';

function StudentList() {
  const session = useSession();

  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, [page, session]);

  async function getStudents() {
    if (session.data && session.data.user.user) {
      const hostel = await session.data.user.user.hostel;
      console.log(hostel);
      console.log(session.data.user.token);
      if (session.data.user.token) {
        const response = await fetch('/api/v1/student', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${session.data.user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page, hostel }),
        });

        if (!response.ok) {
          console.log('Error');
        } else {
          const data = await response.json();
          setStudents(data.students);
          console.log(data);
        }
      }
    }
  }

  return (
    <div className={`${styles.cont}`}>
      <table className={`${styles.list}`}>
        <thead>
          <tr className={`${styles.headings}`}>
            <th className={`${styles.head}`}>Name</th>
            <th className={`${styles.head}`}>Roll No.</th>
            <th className={`${styles.head}`}>Father Name</th>
            <th className={`${styles.head}`}>Branch</th>
            <th className={`${styles.head}`}>Room No</th>
          </tr>
        </thead>
        {/* <tbody> */}
        {students.map((item) => {
          console.log(item);
          return (
            <tr key={item.id} className={`${styles.item}`}>
              <td>{item.name}</td>
              <td>{item.rollno}</td>
              <td>{item.fathername}</td>
              <td>{item.branch}</td>
              <td>{item.roomno}</td>
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
            setPage(page + 1);
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

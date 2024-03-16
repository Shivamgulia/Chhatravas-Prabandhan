import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import styles from '@/styles/main/Complain/ComplainList.module.css';

function StudentList() {
  const session = useSession();

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [complains, setComplains] = useState([]);

  useEffect(() => {
    getComplains();
  }, [page, session]);

  async function getComplains() {
    if (session.data && session.data.user.user) {
      const hostel = await session.data.user.user.hostel;

      if (session.data.user.token) {
        const response = await fetch('/api/v1/complain', {
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
          setComplains(data.complains);
          setPages(data.count);
        }
      }
    }
  }

  return (
    <div className={`${styles.cont}`}>
      <table className={`${styles.table}`}>
        <thead>
          <tr className={`${styles.thead}`}>
            <th className={`${styles.head}`}>Complain</th>
          </tr>
        </thead>
        <tbody>
          {complains.map((item) => {
            return (
              <tr key={item.id} className={`${styles.tbody}`}>
                <td className={`${styles.content}`}>{item.complain}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {(pages > 1) &
      (
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
              if (page < pages) setPage(page + 1);
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

export default StudentList;

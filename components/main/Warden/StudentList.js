import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

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
    <div>
      <ul>
        {students.map((item) => {
          return (
            <li key={item.id} style={{ color: 'black' }}>
              {item.name}
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        next
      </button>
      <button
        onClick={() => {
          if (page > 1) setPage(page - 1);
        }}
      >
        prev
      </button>
    </div>
  );
}

export default StudentList;

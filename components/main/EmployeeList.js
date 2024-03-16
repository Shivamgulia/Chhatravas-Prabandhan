import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import styles from '@/styles/main/EmployeeList.module.css';
import Modal from '../modal/Modal';
import { set } from 'mongoose';

export default function EmployeeList() {
  const session = useSession();

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees();
  }, [page, session]);

  async function getEmployees() {
    if (session.data && session.data.user.user) {
      const hostel = await session.data.user.user.hostel;
      console.log(hostel);
      console.log(session.data.user.token);
      if (session.data.user.token) {
        const response = await fetch('/api/v1/employee', {
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
          setEmployees(data.employees);
          setPages(data.count);
          console.log(data);
        }
      }
    }
  }

  async function addEmployee(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const job = e.target.job.value;
    const hostel = session.data.user.user.hostel;
    const token = session.data.user.token;
    const res = await fetch('/api/v1/employee/create', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, job, hostel }),
    });
    if (res.ok) {
      getEmployees();
      closeModal();
    } else {
      setError(true);
    }
  }

  async function deleteEmployee(id) {
    const token = session.data.user.token;
    console.log(id);
    const confirmation = confirm(
      'Are you sure you want to delete this employee?'
    );
    if (confirmation) {
      const res = await fetch('/api/v1/employee', {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        getEmployees();
      } else {
        console.log('Error');
      }
    } else {
      alert('Employee delete aborted');
    }
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className={`${styles.cont}`}>
      {session.data.user.user.rollno == 0 && (
        <div className={`${styles.addButton}`}>
          <button onClick={openModal} className={`${styles.button}`}>
            Add New Employee
          </button>
        </div>
      )}
      <Modal isOpen={showModal} onClose={closeModal}>
        <div>
          <form onSubmit={addEmployee} className={`${styles.modalCont}`}>
            {error && (
              <h2 className={`${styles.error}`}>Unable to add Employee</h2>
            )}
            <h1>Add Employee</h1>
            <div className={`${styles.modalinputDiv}`}>
              <label htmlFor='' className={`${styles.modallabel}`}></label>
              <input
                type='text'
                name='name'
                placeholder='Name'
                className={`${styles.modalinput}`}
                required
              />
            </div>
            <div className={`${styles.modalinputDiv}`}>
              <label htmlFor='' className={`${styles.modallabel}`}></label>
              <input
                type='text'
                name='job'
                placeholder='Job'
                className={`${styles.modalinput}`}
                required
              />
            </div>
            <button type='submit' className={`${styles.button}`}>
              Add
            </button>
          </form>
        </div>
      </Modal>

      <table className={`${styles.table}`}>
        <thead>
          <tr className={`${styles.thead}`}>
            <th className={`${styles.head}`}>Name</th>
            <th className={`${styles.head}`}>Job</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((item) => {
            console.log(item);
            return (
              <tr key={item.id} className={`${styles.tbody}`}>
                <td className={`${styles.content}`}>{item.name}</td>
                <td className={`${styles.content}`}>{item.job}</td>
                {session.data.user.user.rollno == 0 && (
                  <td
                    className={`${styles.content} ${styles.delete}`}
                    onClick={() => {
                      deleteEmployee(item.id);
                    }}
                  >
                    delete
                  </td>
                )}
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
              setPage(page + 1);
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

import React, { useState } from 'react';
import { FaCheck, FaSkullCrossbones } from 'react-icons/fa6';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';

import styles from '../../styles/main/Home.module.css';

function Home({ user, token }) {
  const [showPass, setShowPass] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState({
    newPassword: true,
    confirmPassword: true,
  });
  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  function updateForm(event) {
    setForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
    if (event.target.name === 'newPassword') {
      if (event.target.value.length < 5) {
        setFormError((prev) => {
          return { ...prev, newPassword: false };
        });
      } else {
        setFormError((prev) => {
          return { ...prev, newPassword: true };
        });
      }
    }

    if (event.target.name === 'confirmPassword') {
      if (form.newPassword != event.target.value) {
        setFormError((prev) => {
          return { ...prev, confirmPassword: false };
        });
      } else {
        setFormError((prev) => {
          return { ...prev, confirmPassword: true };
        });
      }
    }
  }

  async function changePassword(event) {
    event.preventDefault();
    console.log(form);
    if (formError.newPassword && formError.confirmPassword) {
      console.log('in');

      const res = await fetch('/api/auth/resetpassword', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, password: form.newPassword }),
      });
      if (res.ok) {
        alert('Password Updated');
      } else {
        alert('Pawword Change Failed');
      }
    }
  }

  return (
    <div className={`${styles.cont}`}>
      <h1>Home</h1>
      <div className={`${styles.details}`}>
        <h3>name : {user.name}</h3>
        <h3>email : {user.email}</h3>
        {user.rollno != 0 && <h3>rollno : {user.rollno}</h3>}
        <h3>hostel : {user.hostel}</h3>
      </div>

      <div>
        {!showForm && (
          <button
            className={`${styles.passButton}`}
            onClick={() => {
              setShowForm((prev) => !prev);
            }}
          >
            Change Password
          </button>
        )}
      </div>
      {showForm && (
        <form action='' onSubmit={changePassword} className={`${styles.form}`}>
          <div className={`${styles.passdiv}`}>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder='New Password'
              name='newPassword'
              onChange={updateForm}
              className={`${styles.input}`}
            />
            <div
              className={`${styles.error} ${
                formError.newPassword ? styles.green : styles.red
              }`}
            >
              {!formError.newPassword && <FaSkullCrossbones />}
              {formError.newPassword && <FaCheck />}
            </div>
            <button
              onClick={() => {
                setShowPass((prev) => !prev);
              }}
              className={`${styles.showPass}`}
            >
              {showPass && <IoIosEye />}
              {!showPass && <IoIosEyeOff />}
            </button>
          </div>
          <div className={`${styles.passdiv}`}>
            <input
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              onChange={updateForm}
              className={`${styles.input}`}
            />
            <div
              className={`${styles.error} ${
                formError.confirmPassword ? styles.green : styles.red
              }`}
            >
              {!formError.confirmPassword && <FaSkullCrossbones />}
              {formError.confirmPassword && <FaCheck />}
            </div>
          </div>
          <button className={`${styles.submitButton}`} onClick={changePassword}>
            Change Password
          </button>
        </form>
      )}
    </div>
  );
}

export default Home;

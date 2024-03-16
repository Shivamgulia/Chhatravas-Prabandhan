import React from 'react';

import { useSession } from 'next-auth/react';

import styles from '@/styles/main/Notice.module.css';

function Notice() {
  const session = useSession();

  async function submitionHandler(event) {
    event.preventDefault();
    const form = event.target;
    const formEntries = new FormData(form);
    const formObj = Object.fromEntries(formEntries);
    console.log(formObj);

    const res = await fetch('/api/v1/notices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + session.data.user.token,
      },
      body: JSON.stringify(formObj),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.log(res);
    }
  }
  return (
    <div className={`${styles.cont}`}>
      <form onSubmit={submitionHandler} className={`${styles.form}`}>
        <h1 className={`${styles.formHead}`}>Notice</h1>
        <div className={`${styles.inputDiv}`}>
          <label htmlFor='' className={`${styles.label}`}></label>
          <input
            type='text'
            name='head'
            placeholder='Heading'
            className={`${styles.input}`}
            required
          />
        </div>
        <div className={`${styles.inputDiv}`}>
          <label htmlFor='' className={`${styles.label}`}></label>
          <textarea
            type='textarea'
            name='details'
            placeholder='details'
            className={`${styles.input}`}
            required
          />
        </div>
        <button className={`${styles.button}`}>Add New Notice</button>
      </form>
    </div>
  );
}

export default Notice;

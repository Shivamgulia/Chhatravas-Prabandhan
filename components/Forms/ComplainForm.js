import React from 'react';

import styles from '../../styles/Forms/ComplainForm.module.css';
import { useSession } from 'next-auth/react';

function ComplainForm() {
  const session = useSession();
  async function submitionHandler(e) {
    e.preventDefault();

    const res = await fetch('/api/v1/complain/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + session.data.user.token,
      },
      body: JSON.stringify({
        complain: e.target[0].value,
        hostel: session.data.user.user.hostel,
      }),
    });

    if (res.ok) {
      alert('Complain Raised');
    } else {
      alert('Failed to Raise Complaint');
    }
  }
  return (
    <div>
      <form className={`${styles.complainform}`} onSubmit={submitionHandler}>
        <textarea
          className={`${styles.textarea}`}
          name='comaplain'
          id=''
          cols='50'
          rows='5'
          maxLength={200}
        ></textarea>
        <button className={`${styles.button}`} type='submit'>
          Raise Complain
        </button>
      </form>
    </div>
  );
}

export default ComplainForm;

import signup from '@/pages/signup';
import React, { Fragment } from 'react';
import styles from '../../styles/Auth/Signup.module.css';

function Signup() {
  async function signup(event) {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    const response = await fetch(`api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <Fragment>
      <div className={`${styles.signCont}`}>
        <form action='' onSubmit={signup} className={`${styles.form}`}>
          <input type='text' className={`${styles.input}`} />
          <input type='text' className={`${styles.input}`} />
          <button type='submit' className={`${styles.button}`}>
            Sign up
          </button>
        </form>
      </div>
    </Fragment>
  );
}

export default Signup;

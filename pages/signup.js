import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

import SignUpForm from '@/components/Forms/SignUpForm';

import styles from '../styles/SignUp.module.css';

function signup() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  function handlerCallback(response) {
    const userObj = jwtDecode(response.credential);
    console.log(userObj);
    const isCollegeEmail = userObj.email.includes('@hbtu.ac.in');
    if (isCollegeEmail) {
      setError(false);
      setShowForm(true);
      setUser(userObj);
    } else {
      setError(true);
    }
  }
  console.log(user);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handlerCallback,
    });

    google.accounts.id.renderButton(document.getElementById('signInButton'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);
  return (
    <div className={`${styles.cont}`}>
      <div className={`${styles.loginCont}`}>
        <button
          className={`${styles.loginButton}`}
          onClick={() => {
            router.push('/login');
          }}
        >
          Login
        </button>
      </div>
      <div>
        {!showForm && (
          <div className={`${styles.signUpButton}`}>
            <div id='signInButton'></div>
            <h2 className={`${styles.signText}`}>
              Create an Accout With you College Gmail Account
            </h2>
            {error && (
              <h2 className={`${styles.signError}`}>
                U se College Account Only
              </h2>
            )}
          </div>
        )}
        {showForm && (
          <div>
            <SignUpForm user={user} />
          </div>
        )}
      </div>
    </div>
  );
}

export default signup;

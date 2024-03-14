import React, { useEffect, useState } from 'react';

import styles from '../../styles/Forms/SignUpForm.module.css';

function SignUpForm({ user }) {
  const [formData, setFormData] = useState({ name: '', email: '', rollno: '' });
  const [formError, setFormError] = useState();
  async function signUp(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const formObj = Object.fromEntries(form);
    if (formObj.password === formObj.confirmPassword) {
      setFormError(null);
      const reqObj = { ...formData, password: formObj.password };
      console.log(reqObj);

      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...reqObj,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          setFormError(data.message);
        }
      } catch (e) {
        setFormError(e);
      }
    } else {
      setFormError('Passwords Do Not Match');
    }
  }

  useEffect(() => {
    //getting name
    // const names = user.name.split(' ');
    // const name = user.name.replace(names[names.length - 1], '');
    // console.log(name);
    const name = user.given_name;

    //getting roll no
    const rollno = user.email.replace('@hbtu.ac.in', '');

    setFormData({ name: name, email: user.email, rollno: rollno });
  }, [user]);

  console.log(formData);
  return (
    <div className={`${styles.cont}`}>
      <h2 className={`${styles.heading}`}>Sign Up Form</h2>
      <div className={`${styles.infoDiv}`}>
        <div className={`${styles.userInfoDiv}`}>
          <h3 className={`${styles.info}`}>Name : </h3>
          <h3 className={`${styles.info}`}> {'  ' + formData.name}</h3>
        </div>
        <div className={`${styles.userInfoDiv}`}>
          <h3 className={`${styles.info}`}>Email : </h3>
          <h3 className={`${styles.info}`}>{formData.email}</h3>
        </div>
        <div className={`${styles.userInfoDiv}`}>
          <h3 className={`${styles.info}`}>Roll No : </h3>
          <h3 className={`${styles.info}`}>{formData.rollno}</h3>
        </div>
      </div>
      <div className={`${styles.errorDiv}`}>
        {formError && <h2 className={`${styles.error}`}>{formError}</h2>}
      </div>
      <form onSubmit={signUp} className={`${styles.form}`}>
        <div className={`${styles.inputDiv}`}>
          <label className={`${styles.label}`}>Password</label>
          <input
            type='text'
            name='password'
            placeholder='password'
            className={`${styles.input}`}
          />
        </div>
        <div className={`${styles.inputDiv}`}>
          <label className={`${styles.label}`}>Confirm Password</label>
          <input
            type='text'
            name='confirmPassword'
            placeholder='confirmPassword'
            className={`${styles.input}`}
          />
        </div>
        <button className={`${styles.button}`}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;

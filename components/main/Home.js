import React from 'react';

import styles from '../../styles/main/Home.module.css';

function Home({ user }) {
  return (
    <div className={`${styles.cont}`}>
      <h1>Home</h1>
      <div className={`${styles.details}`}>
        <h3>name : {user.name}</h3>
        <h3>email : {user.email}</h3>
        <h3>rollno : {user.rollno}</h3>
        <h3>hostel : {user.hostel}</h3>
      </div>

      <div>
        <button className={`${styles.passButton}`}>Change Password</button>
      </div>
    </div>
  );
}

export default Home;

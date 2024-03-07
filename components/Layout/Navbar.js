import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import Profile from '../../assets/Images/profile.png';

import styles from '../../styles/Layout/Navbar.module.css';

function Navbar() {
  return (
    <div className={`${styles.mainNav}`}>
      <div className={`${styles.logo}`} onClick={signOut}>
        Hostel Management System
      </div>
      <div
        className={`${styles.profile}`}
        onClick={() => {
          signOut();
        }}
      >
        <Image src={Profile} alt='logout' />
      </div>
    </div>
  );
}

export default Navbar;

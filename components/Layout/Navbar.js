import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import Profile from '../../assets/Images/profile.png';

import styles from '../../styles/Layout/Navbar.module.css';

function Navbar() {
  return (
    <div className={`${styles.mainNav}`}>
      <div className={`${styles.logo}`} onclick={signOut}>
        HMS
      </div>
      <div
        className={`${styles.profile}`}
        onClick={() => {
          signOut();
        }}
      >
        <Image src={Profile} />
      </div>
    </div>
  );
}

export default Navbar;

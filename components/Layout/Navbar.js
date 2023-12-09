import React from 'react';
import Image from 'next/image';

import Profile from '../../assets/Images/profile.png';

import styles from '../../styles/Layout/Navbar.module.css';

function Navbar() {
  return (
    <div className={`${styles.mainNav}`}>
      <div className={`${styles.logo}`}>HMS</div>
      <div className={`${styles.profile}`}>
        <Image src={Profile} />
      </div>
    </div>
  );
}

export default Navbar;

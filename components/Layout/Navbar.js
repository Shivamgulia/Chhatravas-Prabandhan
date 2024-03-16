import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { FaRegUserCircle } from 'react-icons/fa';

import Profile from '../../assets/Images/profile.png';

import styles from '../../styles/Layout/Navbar.module.css';

function Navbar() {
  return (
    <div className={`${styles.mainNav}`}>
      <div className={`${styles.logo}`}>Hostel Management System</div>
      <div className={`${styles.profile}`}>
        <FaRegUserCircle className={`${styles.icon}`} />
        {/* <h3>Profile</h3> */}
        <div className={`${styles.dropdown}`}>
          <Link href={'/profile'}>
            <div className={`${styles.dropItem}`}>Home</div>
          </Link>
          <div
            className={`${styles.dropItem}`}
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

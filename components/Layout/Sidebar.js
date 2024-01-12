import React from 'react';

import styles from '../../styles/Layout/Sidebar.module.css';
import Link from 'next/link';

function Sidebar() {
  return (
    <div className={`${styles.cont}`}>
      <Link href={'/profile'}>
        <div className={`${styles.link}`}>Home</div>
      </Link>
      <Link href={'/'}>
        <div className={`${styles.link}`}>Dashboard</div>
      </Link>
      <Link href={'/warden'}>
        <div className={`${styles.link}`}>Warden Dashboard</div>
      </Link>
      <Link href={'/maintainance'}>
        <div className={`${styles.link}`}>Maintainance</div>
      </Link>
      <Link href={'/employee'}>
        <div className={`${styles.link}`}>Employees</div>
      </Link>
    </div>
  );
}

export default Sidebar;

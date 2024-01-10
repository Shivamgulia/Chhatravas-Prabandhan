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
      <div className={`${styles.link}`}>Student details</div>
      <div className={`${styles.link}`}>Room management</div>
      <div className={`${styles.link}`}>Fee management</div>
      <div className={`${styles.link}`}>Warden Staff details</div>
      <div className={`${styles.link}`}>Complains and Re...</div>
      <div className={`${styles.link}`}>Mess updates</div>
      <div className={`${styles.link}`}>Inventory management</div>
    </div>
  );
}

export default Sidebar;

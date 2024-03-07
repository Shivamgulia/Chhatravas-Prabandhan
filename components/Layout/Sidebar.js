import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import styles from '../../styles/Layout/Sidebar.module.css';
import Link from 'next/link';

function Sidebar() {
  const [warden, setWarden] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      if (session.data.user.user.rollno == 0) {
        console.log(session.data.user.user.rollno == 0);
        setWarden(true);
      }
    }
  }, [session.status]);

  return (
    <div className={`${styles.cont}`}>
      <Link href={'/profile'}>
        <div
          className={`${styles.link} ${
            router.pathname.includes('/profile') ? styles.active : ''
          }`}
        >
          Home
        </div>
      </Link>
      <Link href={'/'}>
        <div
          className={`${styles.link} ${
            router.pathname === '/' ? styles.active : ''
          }`}
        >
          Dashboard
        </div>
      </Link>
      <Link href={'/mess'}>
        <div
          className={`${styles.link} ${
            router.pathname === '/mess' ? styles.active : ''
          }`}
        >
          Mess
        </div>
      </Link>
      <Link href={'/updatemenu'}>
        <div
          className={`${styles.link} ${
            router.pathname === '/updatemenu' ? styles.active : ''
          }`}
        >
          Update Mess
        </div>
      </Link>
      {warden && (
        <Link href={'/warden'}>
          <div
            className={`${styles.link} ${
              router.pathname.includes('/warden') ? styles.active : ''
            }`}
          >
            Warden Dashboard
          </div>
        </Link>
      )}
      <Link href={'/maintainance'}>
        <div
          className={`${styles.link} ${
            router.pathname.includes('/maintainance') ? styles.active : ''
          }`}
        >
          Maintainance
        </div>
      </Link>
      <Link href={'/employee'}>
        <div
          className={`${styles.link} ${
            router.pathname.includes('/employee') ? styles.active : ''
          }`}
        >
          Employees
        </div>
      </Link>
      {!warden && (
        <Link href={'/fee'}>
          <div
            className={`${styles.link} ${
              router.pathname === '/fee' ? styles.active : ''
            }`}
          >
            Fee
          </div>
        </Link>
      )}
    </div>
  );
}

export default Sidebar;

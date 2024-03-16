import React from 'react';
import Link from 'next/link';

import styles from '../../styles/main/WardenHome.module.css';

const functionList = [
  { title: 'Student List', path: '/warden/stdlist' },
  { title: 'Maintanance Problems', path: '/warden/issue' },
  { title: 'Add Students', path: '/warden/addstudents' },
];

function WardenHome() {
  return (
    <div className={`${styles.cont}`}>
      <h1>WardenHome</h1>
      <ul className={`${styles.list}`}>
        {functionList.map((item) => {
          return (
            <Link href={item.path}>
              <li className={`${styles.item}`}>{item.title}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default WardenHome;

import React from 'react';

import styles from '../../styles/Layout/Sidebar.module.css';

function Sidebar() {
  return (
    <div className={`${styles.cont}`}>
      <div className={`${styles.link}`}>Student</div>
      <div className={`${styles.link}`}>Warden</div>
      <div className={`${styles.link}`}>Complain</div>
      <div className={`${styles.link}`}>Mess</div>
    </div>
  );
}

export default Sidebar;

import React from 'react';

import styles from '../../styles/main/Dashboard.module.css';

const NoticeBoard = () => {
  const notices = [
    'HOSTEL RULES',
    'UPCOMMING MAINTENANCE',
    'MESS PLAN CHANGED',
  ];

  return (
    <div className={`${styles.cont}`}>
      <h1 className={`${styles.head}`}>Dashboard</h1>
      <div className={`${styles.body}`}>
        <div className={`${styles.noticeboard}`}>
          <h2 className={`${styles.noticehead}`}>Notices</h2>
          <ul className={`${styles.noticelist}`}>
            {notices.map((notice, index) => (
              <li className={`${styles.notice}`} key={index}>
                {notice}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.emergency}`}>
          <h2 className={`${styles.emergencyhead}`}>Emergency Numbers</h2>
          <ul className={`${styles.emergencylist}`}>
            <li className={`${styles.emergencyitem}`}>Police: {100}</li>
            <li className={`${styles.emergencyitem}`}>Ambulance: {102}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;

// import React from 'react';

// import styles from '../../styles/main/Dashboard.module.css';

// const NoticeBoard = () => {
//   const notices = [
//     'HOSTEL RULES',
//     'UPCOMMING MAINTENANCE',
//     'MESS PLAN CHANGED',
//   ];

//   return (
//     <div className={`${styles.cont}`}>
//       <h1 className={`${styles.head}`}>Dashboard</h1>
//       <div className={`${styles.body}`}>
//         <div className={`${styles.noticeboard}`}>
//           <h2 className={`${styles.noticehead}`}>Notices</h2>
//           <ul className={`${styles.noticelist}`}>
//             {notices.map((notice, index) => (
//               <li className={`${styles.notice}`} key={index}>
//                 {notice}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className={`${styles.emergency}`}>
//           <h2 className={`${styles.emergencyhead}`}>Emergency Numbers</h2>
//           <ul className={`${styles.emergencylist}`}>
//             <li className={`${styles.emergencyitem}`}>Police: {100}</li>
//             <li className={`${styles.emergencyitem}`}>Ambulance: {102}</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoticeBoard;

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../../styles/main/Dashboard.module.css';

const NoticeBoard = () => {
  const notices = ['HOSTEL RULES', 'UPCOMING MAINTENANCE', 'MESS PLAN CHANGED'];
  const markedDates = [new Date(2023, 0, 15), new Date(2023, 2, 20)];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}></div>

      <div className={styles.mainContent}>
        <h1 className={styles.head}>Dashboard</h1>

        <div className={styles.topSection}>
          <div className={styles.box}>
            <h2>Total Rooms</h2>
            <p>100</p>
          </div>

          <div className={styles.box}>
            <h2>Booked Rooms</h2>
            <p>50</p>
          </div>

          <div className={styles.box}>
            <h2>Vacant Rooms</h2>
            <p>30</p>
          </div>

          <div className={styles.box}>
            <h2>Standby Rooms</h2>
            <p>20</p>
          </div>
        </div>

        <div className={styles.middleSection}>
          <div className={styles.leftMiddle}>
            <div className={styles.noticeboard}>
              <h2 className={styles.noticehead}>Notices</h2>
              <ul className={styles.noticelist}>
                {notices.map((notice, index) => (
                  <li className={styles.notice} key={index}>
                    {notice}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.rightMiddle}>
            <h2>Yearly Calendar</h2>
            <Calendar
              className={styles.calendar}
              showYearlyNavigation={true}
              tileContent={({ date }) =>
                markedDates.find(
                  (markedDate) =>
                    date.getFullYear() === markedDate.getFullYear() &&
                    date.getMonth() === markedDate.getMonth() &&
                    date.getDate() === markedDate.getDate()
                ) ? (
                  <div className={styles.markedDate}>•</div>
                ) : null
              }
            />
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.emergency}>
            <h2 className={styles.emergencyhead}>Emergency Numbers</h2>
            <ul className={styles.emergencylist}>
              <li className={styles.emergencyitem}>Police: 100</li>
              <li className={styles.emergencyitem}>Ambulance: 102</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;

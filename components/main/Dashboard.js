import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import styles from '../../styles/main/Dashboard.module.css';
import Modal from '../modal/Modal';

const Notices = [
  {
    head: 'HOSTEL RULES',
    details:
      'Hostel loreum ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus, magnam quos, quod, quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem.',
  },
  {
    head: 'UPCOMMING MAINTENANCE',
    details:
      'Upcoming loreum ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus, magnam quos, quod, quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem.',
  },
  ,
  {
    head: 'MESS PLAN CHANGED',
    details:
      'Mess loreum ipsum dolor sit amet consectetur adipisicing elit. Quae voluptatibus, magnam quos, quod, quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem, quod, quos, quae voluptatibus quibusdam quia quas quidem aperiam doloremque praesentium quas quibusdam quia quae. Quisquam, quidem. Quisquam quidem.',
  },
];

const NoticeBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [notice, setNotice] = useState({});
  const [loading, setLoading] = useState({});
  const [notices, setNotices] = useState(Notices);
  const [menu, setMenu] = useState({});
  const date = new Date();

  const session = useSession();

  async function getData() {
    setLoading(true);
    const res1 = await fetch('/api/v1/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + session.data.user.token,
      },
      body: JSON.stringify({ hostel: session.data.user.user.hostel }),
    });
    if (res1.ok) {
      const data = await res1.json();
      setMenu(data.menu[date.getDay() - 1]);
    } else {
      console.log(res1);
    }

    const res2 = await fetch('/api/v1/notices', {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + session.data.user.token,
      },
    });
    if (res2.ok) {
      const data = await res2.json();
      console.log(data);
      setNotices(data.notices);
    } else {
      console.log(res2);
    }
  }

  useEffect(() => {
    if (session.status === 'authenticated') {
      getData();
    }
  }, [session.status]);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className={`${styles.cont}`}>
      <div className={`${styles.extras}`}>
        <div className={`${styles.sideCont}`}>
          <h2 className={`${styles.sideHead}`}>Today</h2>
          <ul className={`${styles.sidelist}`}>
            <li className={`${styles.sideitem1}`}>{date.getDate()}</li>
            <li className={`${styles.sideitem2}`}>{Months[date.getMonth()]}</li>
            <li className={`${styles.sideitem3}`}>{Days[date.getDay()]}</li>
          </ul>
        </div>

        <div className={`${styles.sideCont}`}>
          <h2 className={`${styles.sideHead}`}>Today's Menu</h2>
          <ul className={`${styles.sidelist}`}>
            <li className={`${styles.sideitem1}`}>{menu?.breakfast}</li>
            <li className={`${styles.sideitem2}`}>{menu?.snack}</li>
            <li className={`${styles.sideitem3}`}>{menu?.dinner}</li>
          </ul>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={closeModal}>
        <div className={`${styles.modalCont}`}>
          <h2 className={`${styles.modalHead}`}>Notice</h2>
          <p className={`${styles.modalNotice}`}>{notice.details}</p>
        </div>
      </Modal>
      <div className={`${styles.body}`}>
        <div className={`${styles.noticeboard}`}>
          <h2 className={`${styles.noticehead}`}>Notices</h2>
          <ul className={`${styles.noticelist}`}>
            {notices.map((notice, index) => (
              <li
                className={`${styles.notice}`}
                key={index}
                onClick={() => {
                  setNotice(notice);
                  openModal();
                }}
              >
                {notice.head}
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

var Days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

var Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

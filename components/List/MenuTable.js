import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import styles from '../../styles/List/MenuTable.module.css';

import Modal from '../modal/Modal';

function MenuTable(props) {
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState(null);

  const session = useSession();
  const router = useRouter();

  async function updateMenu(event) {
    event.preventDefault();

    const form = event.target;
    const formObj = new FormData(form);
    const updates = { ...Object.fromEntries(formObj), id: item.id };

    const res = await fetch('/api/v1/menu/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + session.data.user.token,
      },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const data = await res.json();
      props.update();
      console.log(data);
    } else {
      console.log(res);
    }
  }

  function openModal() {
    setShowModal(true);
    console.log(item);
  }
  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className={`${styles.cont}`}>
      <Modal isOpen={showModal} onClose={closeModal}>
        <form className={`${styles.modalCont}`} onSubmit={updateMenu}>
          <h1 className={`${styles.day}`}>{item?.day}</h1>
          <div className={`${styles.modalInputDiv}`}>
            <h2 className={`${styles.modallabel}`}>BreakFast:</h2>
            <input
              type='text'
              name='breakfast'
              defaultValue={item?.breakfast}
              className={`${styles.modalinput}`}
            />
          </div>
          <div className={`${styles.modalInputDiv}`}>
            <h2 className={`${styles.modallabel}`}>Lunch:</h2>
            <input
              type='text'
              name='lunch'
              defaultValue={item?.lunch}
              className={`${styles.modalinput}`}
            />
          </div>
          <div className={`${styles.modalInputDiv}`}>
            <h2 className={`${styles.modallabel}`}>Snack:</h2>
            <input
              type='text'
              name='snack'
              defaultValue={item?.snack}
              className={`${styles.modalinput}`}
            />
          </div>
          <div className={`${styles.modalInputDiv}`}>
            <h2 className={`${styles.modallabel}`}>Dinner:</h2>
            <input
              type='text'
              name='dinner'
              defaultValue={item?.dinner}
              className={`${styles.modalinput}`}
            />
          </div>
          <button className={`${styles.button}`} type='submit'>
            Update
          </button>
        </form>
      </Modal>
      <table className={`${styles.table}`}>
        <thead>
          <tr className={`${styles.thead}`}>
            <th className={`${styles.head}`}>Day</th>
            <th className={`${styles.head}`}>BreakFast</th>
            <th className={`${styles.head}`}>Lunch</th>
            <th className={`${styles.head}`}>Snack</th>
            <th className={`${styles.head}`}>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {props.menu.map((item, index) => {
            return (
              <tr
                className={`${styles.tbody}`}
                key={item.id}
                onClick={() => {
                  if (router.pathname === '/updatemenu') {
                    setItem(item);
                    openModal();
                  }
                }}
              >
                <td className={`${styles.content}`}>{item.day}</td>
                <td className={`${styles.content}`}>{item.breakfast}</td>
                <td className={`${styles.content}`}>{item.lunch}</td>
                <td className={`${styles.content}`}>{item.snack}</td>
                <td className={`${styles.content}`}>{item.dinner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MenuTable;

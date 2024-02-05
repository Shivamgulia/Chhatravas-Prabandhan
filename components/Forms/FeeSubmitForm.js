import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import styles from '../../styles/Forms/FeeSubmitForm.module.css';

function FeeSubmitForm() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status === 'unauthenticated') router.push('/login');
  }, [session]);
  async function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className={`${styles.cont}`}>
      <h1 className={`${styles.heading}`}>Raise Issue</h1>
      <form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className={`${styles.inputDiv}`}>
          <label htmlFor='' className={`${styles.label}`}>
            room_no
          </label>
          <input type='number' className={`${styles.input}`} required />
        </div>
        <div className={`${styles.inputDiv}`}>
          <label htmlFor='' className={`${styles.label}`}>
            Fee Type
          </label>
          <input type='text' className={`${styles.input}`} required />
        </div>
        <div className={`${styles.inputDiv}`}>
          <label htmlFor='' className={`${styles.label}`}>
            Transcation ID
          </label>
          <input type='text' className={`${styles.input}`} required />
        </div>
        <div className={`${styles.inputDiv}`}>
          <label htmlFor='' className={`${styles.label}`}>
            Amount
          </label>
          <input type='text' className={`${styles.input}`} required />
        </div>

        <button className={`${styles.button}`}>Raise Issue</button>
      </form>
    </div>
  );
}

export default FeeSubmitForm;

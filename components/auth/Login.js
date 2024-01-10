import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Auth/Login.module.css';
import { signIn } from 'next-auth/react';

export default function Login() {
  const uNameRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/');
    }
  }, [session]);

  async function onSubmit(event) {
    event.preventDefault();
    //   call login function here

    console.log(uNameRef.current.value);
    console.log(passwordRef.current.value);
    const res = await signIn('credentials', {
      email: uNameRef.current.value,
      password: passwordRef.current.value,
      redirect: false,
    });
    console.log(res);
    if (res.error) setError(true);
    else setError(false);
  }

  return (
    <div className={`${styles.cont}`}>
      <div className={styles.loginCont}>
        <h1>Login</h1>
        <form action='' className={styles.loginForm} onSubmit={onSubmit}>
          <div className={`${styles.error}`}>
            {error && <h4>Invalid Credentials</h4>}
          </div>
          <div className={styles.formInput}>
            <label htmlFor='uname' className={styles.label}>
              {' '}
              User Name
            </label>
            <input
              ref={uNameRef}
              type='text'
              name='uname'
              id='uname'
              placeholder='Jhon@gmail.com'
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formInput}>
            <label htmlFor='pass' className={styles.label}>
              Passwords
            </label>
            <input
              className={styles.input}
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              name='pass'
              id='pass'
              placeholder='XXXXXXXXXXX'
              required
            />
          </div>
          <div className={`${styles.showPasswordDiv}`}>
            <input
              type='checkbox'
              id='showP'
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className={`${styles.passCheck}`}
            />
            <label htmlFor='showP'>Show Password</label>
          </div>

          <button className={styles.loginButton}>Login</button>
        </form>
      </div>
    </div>
  );
}

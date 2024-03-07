import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

function signup() {
  const session = useSession();

  useEffect(() => {
    session && console.log(session);
    session.user && console.log(session.user);
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          signIn();
        }}
      >
        SignUP
      </button>
    </div>
  );
}

export default signup;

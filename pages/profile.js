import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Home from '@/components/main/Home';
import Layout from '@/components/Layout/Layout';

const user = {
  name: 'John Doe',
  email: 'Jhon@gmail.com',
  branch: 'Electronics Engineering',
  hostel: 'Abdul Kalam Hostel',
};

const Profile = () => {
  const session = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  useEffect(() => {
    if (session.data?.user) {
      setUser(session.data.user.user);
      setToken(session.data.user.token);
    }

    if (session.status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session]);

  return <Layout>{user && <Home user={user} token={token} />}</Layout>;
};

export default Profile;

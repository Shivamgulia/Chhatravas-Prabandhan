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
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (session.data?.user) {
      setUser(session.data.user.user);
      console.log(user);
    }

    if (session.status === 'unauthenticated') {
      // router.push('/login');
    }
  }, [session]);
  console.log(user);

  return <Layout>{user && <Home user={user} />}</Layout>;
};

export default Profile;

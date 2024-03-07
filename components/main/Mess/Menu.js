import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import MenuTable from '@/components/List/MenuTable';
import { useRouter } from 'next/router';

function Menu() {
  const [menu, setMenu] = useState([]);

  const session = useSession();

  const router = useRouter();

  async function getMenu() {
    const res = await fetch('/api/v1/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + session.data.user.token,
      },
      body: JSON.stringify({ hostel: session.data.user.user.hostel }),
    });
    if (res.ok) {
      const data = await res.json();
      setMenu(data.menu);
      console.log(data);
    } else {
      console.log(res);
    }
  }

  useEffect(() => {
    if (session.status === 'authenticated') {
      getMenu();
    }
  }, [session.status]);

  return (
    <div>
      <MenuTable menu={menu} update={getMenu} />
    </div>
  );
}

export default Menu;

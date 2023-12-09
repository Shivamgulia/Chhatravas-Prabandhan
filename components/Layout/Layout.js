import React, { Fragment } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

import styles from '../../styles/Layout/Layout.module.css';

function Layout(props) {
  return (
    <Fragment>
      <div className={`${styles.cont}`}>
        <Navbar />
        <div className={`${styles.body}`}>
          <Sidebar />
          <div>{props.children}</div>
        </div>
      </div>
    </Fragment>
  );
}

export default Layout;

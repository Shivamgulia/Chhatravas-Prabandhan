import React from 'react';

import styles from '../../styles/List/MenuTable.module.css';

function MenuTable() {
  return (
    <div className={`${styles.cont}`}>
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
          <tr className={`${styles.tbody}`}>
            <td className={`${styles.content}`}>Monday</td>
            <td className={`${styles.content}`}>a</td>
            <td className={`${styles.content}`}>a</td>
            <td className={`${styles.content}`}>b</td>
            <td className={`${styles.content}`}>b</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MenuTable;

import React from 'react';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <svg
        className={styles.spinner}
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.circle}
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    </div>
  );
}

export default Loader;

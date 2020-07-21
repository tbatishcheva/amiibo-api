import React from 'react';
import PropTypes from 'prop-types';
import styles from './Loader.module.css';

Loader.propTypes = {
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: '',
};

function Loader({ className }) {
  return (
    <div className={`${styles.loader} ${className}`}>
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

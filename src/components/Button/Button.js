import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: null,
};

function Button({ children, onClick }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

export const RED = 'red';
export const NEUTRAL = 'neutral';

const COLORS_MAP = {
  [RED]: styles.red,
  [NEUTRAL]: styles.neutral,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

Button.defaultProps = {
  onClick: null,
  color: NEUTRAL,
};

function Button({ children, onClick, color }) {
  const btnClassName = `${styles.button} ${COLORS_MAP[color]}`;

  return (
    <button
      type="button"
      className={btnClassName}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.css';

Select.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  selected: PropTypes.string,
  className: PropTypes.string,
};

Select.defaultProps = {
  options: null,
  onChange: null,
  selected: '',
  className: '',
};

function Select({
  title, options, onChange, selected, className,
}) {
  return (
    <div className={className}>
      <div className={styles.title}>{title}</div>
      <select
        disabled={!options || options.length === 0}
        className={styles.select}
        onChange={onChange}
        value={selected || ''}
      >
        {options.map((o) => (
          <option
            key={o}
            value={o}
          >
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

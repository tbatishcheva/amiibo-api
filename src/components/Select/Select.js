import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.css';

Select.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
};

Select.defaultProps = {
    options: null,
    onChange: null,
};

function Select({title, options, onChange}) {
    if (!options || options.length === 0) {
        return null;
    }

    return (
        <>
            {title}
            <select className={styles.select} onChange={onChange}>
                {options.map(o => <option key={o}>{o}</option>)}
            </select>
        </>
    );
}

export default Select;

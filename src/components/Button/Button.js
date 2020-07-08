import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

Button.propTypes = {
    children: PropTypes.node.isRequired,
};

function Button({children}) {
    return (
        <button className={styles.button}>
            {children}
        </button>
    );
}

export default Button;

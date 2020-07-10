import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filters.module.css';

Filters.propTypes = {
    gameseries: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func,
};
Filters.defaultProps = {
    onChange: null,
};

function Filters({gameseries, onChange}) {
    return (
        <div className={styles.filters}>
            Select The GameSeries: &#160;
            <select className={styles.selectGameSeries} onChange={onChange}>
                {gameseries.map(g => <option key={g}>{g}</option>)}
            </select>
        </div>
    );
}

export default Filters;

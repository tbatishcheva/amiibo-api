import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filters.module.css';

Filters.propTypes = {
    gameseries: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function Filters({gameseries}) {
    return (
        <div className={styles.filters}>
            Select The GameSeries: &#160;
            <select className={styles.selectGameSeries}>
                {gameseries.map(g => <option key={g}>{g}</option>)}
            </select>
        </div>
    );
}

export default Filters;

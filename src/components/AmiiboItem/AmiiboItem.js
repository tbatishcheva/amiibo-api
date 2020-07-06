import React from 'react';
import styles from './AmiiboItem.module.css';
import Amiibo from "./../../models/Amiibo";
import  PropTypes from 'prop-types';

AmiiboItem.propTypes = {
    amiibo: PropTypes.instanceOf(Amiibo).isRequired,
}

function AmiiboItem({amiibo}) {
    return (
        <div className={styles.amiiboItem}>
            {amiibo.tail}
        </div>
    );
}

export default AmiiboItem;

import React from 'react';
import PropTypes from 'prop-types';
import Amiibo from "./../../models/Amiibo";
import AmiiboItem from "./../../components/AmiiboItem/AmiiboItem";
import styles from './AmiiboList.module.css';

AmiiboList.propTypes = {
    amiibos: PropTypes.arrayOf(PropTypes.instanceOf(Amiibo)).isRequired,
};

function AmiiboList({amiibos}) {
    return (
        <div className={styles.amiiboList}>
            {amiibos.map(a => <AmiiboItem key={a.tail} amiibo={a}/>)}
        </div>
    );
}

export default AmiiboList;

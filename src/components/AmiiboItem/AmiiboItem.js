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
            <img alt="Amiibo" src={amiibo.image}/>
            {/*{amiibo.tail} +*/}
            {/*{amiibo.tail} +*/}
            {/*{amiibo.name} **/}
            {/*{amiibo.amiiboSeries} /*/}
            {/*{amiibo.gameSeries} =*/}
            {/*{amiibo.character} -*/}
            {/*{amiibo.type} +*/}
        </div>
    );
}

export default AmiiboItem;

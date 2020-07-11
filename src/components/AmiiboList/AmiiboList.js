import React, {useContext} from 'react';
import AmiiboItem from "./../../components/AmiiboItem/AmiiboItem";
import styles from './AmiiboList.module.css';
import AppContext from '../../contexts/AppContext';

function AmiiboList() {
    const {amiibos} = useContext(AppContext);

    if (!amiibos || amiibos.length === 0) {
        return null;
    }

    return (
        <div className={styles.amiiboList}>
            {amiibos.map(a => <AmiiboItem key={a.tail} amiibo={a}/>)}
        </div>
    );
}

export default AmiiboList;

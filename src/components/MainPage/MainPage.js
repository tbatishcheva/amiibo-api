import React, {useContext} from 'react';
import styles from './MainPage.module.css';
import AppContext from "./../../contexts/AppContext";
import AmiiboItem from "./../../components/AmiiboItem/AmiiboItem";

function MainPage() {
    const {amiibos} = useContext(AppContext);
    return (
        <div className={styles.mainPage}>
            {amiibos.map(a => <AmiiboItem key={a.tail} amiibo={a}/>)}
        </div>
    );
}

export default MainPage;

import React, {useCallback, useContext, useEffect} from 'react';
import styles from './MainPage.module.css';
import AmiiboApi from "./../../API/AmiiboApi";
import Amiibo from "./../../models/Amiibo";
import AppContext from "./../../contexts/AppContext";
import {CHANGE_AMIIBOS} from "./../../constants/actionTypes";
import AmiiboList from "./../../components/AmiiboList/AmiiboList";

function MainPage() {
    const {amiibos, dispatch} = useContext(AppContext);
    const amiiboApi = new AmiiboApi();

    const changeAmiibos = useCallback((amiibosRes) => {
            dispatch({
                type: CHANGE_AMIIBOS,
                amiibos: amiibosRes,
            })
        },
        [dispatch]);

    useEffect(
        () => {
            amiiboApi.fetchAmiibos().then(res => {
                const amiibosRes = res.amiibo.map(r => new Amiibo(r));
                changeAmiibos(amiibosRes);
            });
        },
        [amiibos, amiiboApi, changeAmiibos]);

    if (!amiibos || amiibos.length === 0) {
        return null;
    }

    return (
        <div className={styles.mainPage}>
            <AmiiboList amiibos={amiibos}/>
        </div>
    );
}

export default MainPage;

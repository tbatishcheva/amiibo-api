import React, {useCallback, useContext, useEffect} from 'react';
import styles from './MainPage.module.css';
import AmiiboItem from "./../../components/AmiiboItem/AmiiboItem";
import AmiiboApi from "./../../API/AmiiboApi";
import Amiibo from "./../../models/Amiibo";
import AppContext from "./../../contexts/AppContext";
import {CHANGE_AMIIBOS} from "./../../constants/actionTypes";

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

    return (
        <div className={styles.mainPage}>
            {amiibos.map(a => <AmiiboItem key={a.tail} amiibo={a}/>)}
        </div>
    );
}

export default MainPage;

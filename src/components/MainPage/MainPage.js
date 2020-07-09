import React, {useCallback, useContext, useEffect} from 'react';
import styles from './MainPage.module.css';
import AmiiboApi from "./../../API/AmiiboApi";
// import Amiibo from "./../../models/Amiibo";
import AppContext from "./../../contexts/AppContext";
import {CHANGE_AMIIBOS, CHANGE_GAMESERIES} from "./../../constants/actionTypes";
import AmiiboList from "./../../components/AmiiboList/AmiiboList";
import Filters from "./../../components/Filters/Filters";

function MainPage() {
    const {amiibos, dispatch, gameseries} = useContext(AppContext);
    const amiiboApi = new AmiiboApi();

    const changeAmiibos = useCallback((amiibosRes) => {
            dispatch({
                type: CHANGE_AMIIBOS,
                amiibos: amiibosRes,
            })
        },
        [dispatch]);

    const changeGameseries = useCallback((gameseries) => {
            dispatch({
                type: CHANGE_GAMESERIES,
                gameseries: gameseries,
            })
        },
        [dispatch]);

    useEffect(
        () => {
            // amiiboApi.fetchAmiibos().then(res => {
            //     const amiibosRes = res.amiibo ? res.amiibo.map(r => new Amiibo(r)) : [];
            //     if (!amiibosRes || amiibosRes.length === 0) {
            //         return;
            //     }
            //
            //     changeAmiibos(amiibosRes);
            // });

            amiiboApi.fetchGameSeries().then(res => {
                const gameseries = res.amiibo.map(g => g.name);
                if (!gameseries || gameseries.length === 0) {
                    return;
                }

                const amiibosRes = [...new Set(gameseries)];
                changeGameseries(amiibosRes);
            })
        },
        [amiibos, amiiboApi, changeAmiibos, changeGameseries]);

    return (
        <div className={styles.mainPage}>
            <header className={styles.header}>
                Amiibos
            </header>
            <Filters gameseries={gameseries}/>
            <AmiiboList amiibos={amiibos}/>
        </div>
    );
}

export default MainPage;

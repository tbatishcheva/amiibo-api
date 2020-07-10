import React, {useCallback, useContext, useEffect} from 'react';
import styles from './MainPage.module.css';
import AmiiboApi from "./../../API/AmiiboApi";
import Amiibo from "./../../models/Amiibo";
import AppContext from "./../../contexts/AppContext";
import {CHANGE_ACTIVE_GAMESERIES, CHANGE_AMIIBOS, CHANGE_GAMESERIES} from "./../../constants/actionTypes";
import AmiiboList from "./../../components/AmiiboList/AmiiboList";
import Filters from "./../../components/Filters/Filters";

function MainPage() {
    const {amiibos, dispatch, gameseries, activeGameseries} = useContext(AppContext);
    const amiiboApi = new AmiiboApi();

    const handleSelectGameseriesChange = useCallback(
        (e) => {
            dispatch({
                type: CHANGE_ACTIVE_GAMESERIES,
                activeGameseries: e.currentTarget.value,
            })
        },
        [dispatch]);


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
            if (activeGameseries !== '') {
                amiiboApi.fetchGameAmiiboSeries(activeGameseries).then(res => {
                    const amiibosRes = res.amiibo ? res.amiibo.map(r => new Amiibo(r)) : [];
                    if (!amiibosRes || amiibosRes.length === 0) {
                        return;
                    }

                    changeAmiibos(amiibosRes);
                });
            }

            amiiboApi.fetchGameSeries().then(res => {
                const gameseries = res.amiibo.map(g => g.name);
                if (!gameseries || gameseries.length === 0) {
                    return;
                }

                const amiibosRes = [...new Set(gameseries)];
                changeGameseries(amiibosRes);
            })
        },
        [amiibos, amiiboApi, changeAmiibos, changeGameseries, activeGameseries]);

    return (
        <div className={styles.mainPage}>
            <header className={styles.header}>
                Amiibos
            </header>
            <Filters gameseries={gameseries} onChange={handleSelectGameseriesChange}/>
            <AmiiboList amiibos={amiibos}/>
        </div>
    );
}

export default MainPage;

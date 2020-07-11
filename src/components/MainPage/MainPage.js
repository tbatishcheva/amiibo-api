import React, {useCallback, useContext, useEffect} from 'react';
import styles from './MainPage.module.css';
import AmiiboApi from "./../../API/AmiiboApi";
import Amiibo from "./../../models/Amiibo";
import AppContext from "./../../contexts/AppContext";
import {
    CHANGE_AMIIBOS,
    CHANGE_GAMESERIES,
    CHANGE_CHARACTERS
} from "./../../constants/actionTypes";
import AmiiboList from "./../../components/AmiiboList/AmiiboList";
import Filters from "./../../components/Filters/Filters";

function MainPage() {
    const {amiibos, dispatch, activeGameseries, activeCharacter} = useContext(AppContext);
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
    const changeCharacters = useCallback((characters) => {
            dispatch({
                type: CHANGE_CHARACTERS,
                characters: characters,
            })
        },
        [dispatch]);

    useEffect(
        () => {
            amiiboApi.fetchAmiibos().then(res => {
                const amiibosRes = res.amiibo ? res.amiibo.map(r => new Amiibo(r)) : [];
                if (!amiibosRes || amiibosRes.length === 0) {
                    return;
                }

                changeAmiibos(amiibosRes);
            });

            amiiboApi.fetchGameSeries().then(res => {
                const gameseries = res.amiibo.map(g => g.name);
                if (!gameseries || gameseries.length === 0) {
                    return;
                }

                const amiibosRes = [...new Set(gameseries)];
                changeGameseries(amiibosRes);
            })

            amiiboApi.fetchCharacters().then(res => {
                const characters = res.amiibo.map(g => g.name);
                if (!characters || characters.length === 0) {
                    return;
                }

                const amiibosRes = [...new Set(characters)];
                changeCharacters(amiibosRes);
            })
        },
        [
            amiibos,
            amiiboApi,
            changeAmiibos,
            changeGameseries,
            activeGameseries,
            activeCharacter,
            changeCharacters
        ]);

    return (
        <div className={styles.mainPage}>
            <header className={styles.header}>
                Amiibos
            </header>
            <Filters/>
            <AmiiboList/>
        </div>
    );
}

export default MainPage;

import React, { useCallback, useContext, useEffect } from 'react';
import styles from './MainPage.module.css';
import AppContext from '../../contexts/AppContext';
import {
  CHANGE_AMIIBOS,
  CHANGE_GAMESERIES,
  CHANGE_CHARACTERS,
} from '../../constants/actionTypes';
import AmiiboList from '../AmiiboList/AmiiboList';
import Filters from '../Filters/Filters';

function MainPage() {
  const {
    amiibos,
    dispatch,
    activeParams,
    amiiboApi,
  } = useContext(AppContext);

  // todo add useRef for const amiiboApi = new AmiiboApi();

  const changeAmiibos = useCallback((amiibosRes) => {
    dispatch({
      type: CHANGE_AMIIBOS,
      amiibosRes,
    });
  },
  [dispatch]);
  const changeGameseries = useCallback((gameseriesRes) => {
    dispatch({
      type: CHANGE_GAMESERIES,
      gameseries: gameseriesRes,
    });
  },
  [dispatch]);
  const changeCharacters = useCallback((charactersRes) => {
    dispatch({
      type: CHANGE_CHARACTERS,
      characters: charactersRes,
    });
  },
  [dispatch]);

  useEffect(() => {
    const activeKeys = Object.keys(activeParams);
    const params = activeKeys.map((ak) => `${ak}=${activeParams[ak]}`).join('&');
    amiiboApi.fetchAmiibosByParams(params).then((res) => changeAmiibos(res.amiibo));
  }, [amiiboApi, activeParams, changeAmiibos]);
  useEffect(() => {
    amiiboApi.fetchGameSeries().then((res) => {
      changeGameseries(res.amiibo);
    });
  }, [amiiboApi, changeGameseries]);
  useEffect(
    () => {
      amiiboApi.fetchCharacters().then((res) => {
        changeCharacters(res.amiibo);
      });
    },
    [amiiboApi, changeCharacters],
  );

  return (
    <div className={styles.mainPage}>
      <header className={styles.header}>
        Amiibos
      </header>
      <Filters />
      <AmiiboList amiibos={amiibos} />
    </div>
  );
}

export default MainPage;

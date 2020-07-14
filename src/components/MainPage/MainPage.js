import React, {
  useCallback, useContext, useEffect,
} from 'react';
import styles from './MainPage.module.css';
import Amiibo from '../../models/Amiibo';
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

  // useRef
  // const amiiboApi = new AmiiboApi();

  const changeAmiibos = useCallback((amiibosRes) => {
    dispatch({
      type: CHANGE_AMIIBOS,
      amiibos: amiibosRes,
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
    amiiboApi.fetchAmiibosByParams(params).then((res) => {
      const amiibosRes = res.amiibo ? res.amiibo.map((r) => new Amiibo(r)) : [];
      if (!amiibosRes || amiibosRes.length === 0) {
        return;
      }

      changeAmiibos(amiibosRes);
    });
  }, [amiiboApi, activeParams, changeAmiibos]);

  useEffect(() => {
    amiiboApi.fetchGameSeries().then((res) => {
      const gameseriesRes = res.amiibo.map((g) => g.name);
      if (!gameseriesRes || gameseriesRes.length === 0) {
        return;
      }

      const amiibosRes = [...new Set(gameseriesRes)];
      changeGameseries(amiibosRes);
    });
  }, [amiiboApi, changeGameseries]);

  useEffect(
    () => {
      amiiboApi.fetchCharacters().then((res) => {
        const charactersRes = res.amiibo.map((g) => g.name);
        if (!charactersRes || charactersRes.length === 0) {
          return;
        }

        const amiibosRes = [...new Set(charactersRes)];
        changeCharacters(amiibosRes);
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

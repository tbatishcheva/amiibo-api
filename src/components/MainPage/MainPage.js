import React, {
  useCallback, useContext, useEffect, useReducer,
} from 'react';
import FilterContext from '../../contexts/FilterContext';
import AppContext from '../../contexts/AppContext';
import {
  CHANGE_AMIIBOS,
  CHANGE_GAMESERIES,
  CHANGE_CHARACTERS, CHANGE_ACTIVE_GAMESERIES, CHANGE_ACTIVE_CHARACTER,
} from '../../constants/actionTypes';
import AmiiboList from '../AmiiboList/AmiiboList';
import Filters from './Filters/Filters';
import Header from '../Header/Header';
import styles from './MainPage.module.css';
import Loader from '../Loader/Loader';

const activeParams = {
  gameseries: null,
  character: null,
};

const filterState = {
  activeParams,
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_GAMESERIES:
      return {
        ...state,
        activeParams: {
          ...state.activeParams,
          gameseries: action.activeGameseries,
        },
      };
    case CHANGE_ACTIVE_CHARACTER:
      return {
        ...state,
        activeParams: {
          ...state.activeParams,
          character: action.activeCharacter,
        },
      };
    default:
      return 'Error';
  }
};

function MainPage() {
  const [state, filterDispatch] = useReducer(filterReducer, filterState);

  const {
    amiibos,
    dispatch,
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
    const activeKeys = Object.keys(state.activeParams);
    const params = activeKeys
      .map((ak) => (state.activeParams[ak] ? `${ak}=${state.activeParams[ak]}` : '')).join('&');
    amiiboApi.fetchAmiibosByParams(params).then((res) => changeAmiibos(res.amiibo));
  }, [amiiboApi, state, changeAmiibos]);

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
    <FilterContext.Provider value={{ ...state, filterDispatch }}>
      <div className={styles.mainPage}>
        <Header />
        <Filters />
        {(!amiibos || amiibos.length === 0) && (
        <div className={styles.loader}><Loader /></div>
        )}
        <AmiiboList amiibos={amiibos} />
      </div>
    </FilterContext.Provider>
  );
}

export default MainPage;

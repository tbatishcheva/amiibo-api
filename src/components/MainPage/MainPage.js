import React, {
  useCallback, useContext, useEffect, useReducer,
} from 'react';
import handleAmiibosRes from '../../helpers/handleAmiibosRes';
import MainPageContext from '../../contexts/MainPageContext';
import AppContext from '../../contexts/AppContext';
import {
  CHANGE_AMIIBOS,
  CHANGE_ACTIVE_GAMESERIES,
  CHANGE_ACTIVE_CHARACTER,
} from '../../constants/actionTypes';
import AmiiboList from '../AmiiboList/AmiiboList';
import Filters from './Filters/Filters';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import styles from './MainPage.module.css';

const mainPageState = {
  activeParams: {
    gameseries: null,
    character: null,
  },
  amiibos: [],
};

const mainPageReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_AMIIBOS:
      return { ...state, amiibos: handleAmiibosRes(action.amiibosRes) };
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
  const [state, mainPageDispatch] = useReducer(mainPageReducer, mainPageState);

  const { amiiboApi } = useContext(AppContext);

  // todo add useRef for const amiiboApi = new AmiiboApi();

  const changeAmiibos = useCallback((amiibosRes) => {
    mainPageDispatch({
      type: CHANGE_AMIIBOS,
      amiibosRes,
    });
  },
  [mainPageDispatch]);

  useEffect(() => {
    const activeKeys = Object.keys(state.activeParams);
    const params = activeKeys
      .map((ak) => (state.activeParams[ak] ? `${ak}=${state.activeParams[ak]}` : '')).join('&');
    amiiboApi.fetchAmiibosByParams(params).then((res) => changeAmiibos(res.amiibo));
  }, [amiiboApi, state.activeParams, changeAmiibos]);

  return (
    <MainPageContext.Provider value={{ ...state, mainPageDispatch }}>
      <div className={styles.mainPage}>
        <Header />
        <Filters />
        {(!state.amiibos || state.amiibos.length === 0)
        && <Loader className={styles.loader} />}
        <AmiiboList amiibos={state.amiibos} />
      </div>
    </MainPageContext.Provider>
  );
}

export default MainPage;

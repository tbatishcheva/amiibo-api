import React, { useReducer } from 'react';
import toggleArrayElement from '../../helpers/toggleArrayElement';
import Amiibo from '../../models/Amiibo';
import styles from './App.module.css';
import MainPage from '../MainPage/MainPage';
import AppContext from '../../contexts/AppContext';
import {
  CHANGE_ACTIVE_CHARACTER,
  CHANGE_ACTIVE_GAMESERIES,
  CHANGE_AMIIBOS, CHANGE_CHARACTERS,
  CHANGE_GAMESERIES,
  TOGGLE_LIKE,
} from '../../constants/actionTypes';
import AmiiboApi from '../../API/AmiiboApi';

// todo add filters store
// todo -> filters store
// todo follow to inside params
const activeParams = {
  // gameseries: 'Yoshi\'s Woolly World',
  // character: 'Yoshi',
  // character: 'Mario',
  gameseries: 'Super Mario',
  character: 'Luigi',
};

const appState = {
  amiibos: [],
  gameseries: [],
  characters: [],
  activeParams,
  amiiboApi: new AmiiboApi(),
  likedAmiibos: [],
};

/**
 * @param {?Object[]}amiibosRes
 * @return {Amiibo[]}
 */
const handleAmiibosRes = (amiibosRes) => (amiibosRes ? amiibosRes.map((r) => new Amiibo(r)) : []);

/**
 * @param {?Object[]} amiibosAttr
 * @return {string[]}
 */
const handleAmiiboAttr = (amiibosAttr) => [...new Set(amiibosAttr ? amiibosAttr.map((g) => g.name) : [])];

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_AMIIBOS:
      return { ...state, amiibos: handleAmiibosRes(action.amiibosRes) };
    case CHANGE_ACTIVE_GAMESERIES:
      return (
        {
          ...state,
          activeParams: Object.assign(state.activeParams, {
            gameseries: action.activeGameseries,
          }),
        });
    case CHANGE_ACTIVE_CHARACTER:
      return {
        ...state,
        activeParams: Object.assign(state.activeParams, {
          character: action.activeCharacter,
        }),
      };
    case CHANGE_GAMESERIES:
      return ({ ...state, gameseries: handleAmiiboAttr(action.gameseries) });
    case CHANGE_CHARACTERS:
      return ({ ...state, characters: handleAmiiboAttr(action.characters) });
    case TOGGLE_LIKE:
      return ({ ...state, likedAmiibos: toggleArrayElement(action.amiibo, state.likedAmiibos) });
    default:
      return 'Error';
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, appState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <div className={styles.app}>
        <MainPage />
      </div>
    </AppContext.Provider>
  );
}

export default App;

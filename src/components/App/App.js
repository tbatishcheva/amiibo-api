import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import handleAmiibosRes from '../../helpers/handleAmiibosRes';
import {
  CHANGE_AMIIBOS, CHANGE_CHARACTERS,
  CHANGE_GAMESERIES,
  TOGGLE_LIKE,
} from '../../constants/actionTypes';
import toggleArrayElement from '../../helpers/toggleArrayElement';
import MainPage from '../MainPage/MainPage';
import AppContext from '../../contexts/AppContext';

import AmiiboApi from '../../API/AmiiboApi';
import styles from './App.module.css';
import LikesPage from '../LikesPage/LikesPage';
import AmiiboPage from '../AmiiboPage/AmiiboPage';

/**
 * @param {Amiibo} amiibo
 * @return {string}
 */
const getAmiiboId = (amiibo) => amiibo.head + amiibo.tail;

const appState = {
  amiibos: [],
  gameseries: [],
  characters: [],
  amiiboApi: new AmiiboApi(),
  likedAmiibosIds: [],
  getAmiiboId,
};

/**
 * @param {?Object[]} amiibosAttr
 * @return {string[]}
 */
const handleAmiiboAttr = (amiibosAttr) => [null,
  ...new Set(amiibosAttr ? amiibosAttr.map((g) => g.name) : [])];

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_AMIIBOS:
      return { ...state, amiibos: handleAmiibosRes(action.amiibosRes) };
    case CHANGE_GAMESERIES:
      return { ...state, gameseries: handleAmiiboAttr(action.gameseries) };
    case CHANGE_CHARACTERS:
      return { ...state, characters: handleAmiiboAttr(action.characters) };
    case TOGGLE_LIKE:
      return {
        ...state,
        likedAmiibosIds: toggleArrayElement(getAmiiboId(action.amiibo), [...state.likedAmiibosIds]),
      };
    default:
      return 'Error';
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, appState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <Router>
        <div className={styles.app}>
          <Switch>
            <Route path="/amiibo/:id">
              <AmiiboPage />
            </Route>
            <Route path="/likes">
              <LikesPage />
            </Route>
            <Route path="/">
              <MainPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;

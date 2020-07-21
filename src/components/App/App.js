import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
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
  amiiboApi: new AmiiboApi(),
  likedAmiibosIds: [],
  getAmiiboId,
};

const reducer = (state, action) => {
  switch (action.type) {
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

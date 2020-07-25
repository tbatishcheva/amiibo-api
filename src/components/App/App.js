import React, { useCallback, useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  SET_LIKE,
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
      // eslint-disable-next-line no-case-declarations
      const newLikedAmiibosIds = toggleArrayElement(
        getAmiiboId(action.amiibo), [...state.likedAmiibosIds],
      );
      window.localStorage.clear();
      window.localStorage.setItem('likedAmiibosIds', JSON.stringify(newLikedAmiibosIds));
      return {
        ...state,
        likedAmiibosIds: newLikedAmiibosIds,
      };
    case SET_LIKE:
      // eslint-disable-next-line no-case-declarations
      const likedAmiibosIds = window.localStorage.getItem('likedAmiibosIds');
      return {
        ...state,
        likedAmiibosIds: likedAmiibosIds ? JSON.parse(likedAmiibosIds) : [],
      };
    default:
      return 'Error';
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, appState);

  const updateLikes = useCallback(() => {
    dispatch({
      type: SET_LIKE,
    });
  }, [dispatch]);

  useEffect(() => {
    updateLikes();
  }, [updateLikes]);

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

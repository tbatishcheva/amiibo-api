import React, { useReducer } from 'react';
import styles from './App.module.css';
import MainPage from '../MainPage/MainPage';
import AppContext from '../../contexts/AppContext';
import {
  CHANGE_ACTIVE_CHARACTER,
  CHANGE_ACTIVE_GAMESERIES,
  CHANGE_AMIIBOS, CHANGE_CHARACTERS,
  CHANGE_GAMESERIES,
} from '../../constants/actionTypes';
import AmiiboApi from '../../API/AmiiboApi';

// todo filters state
// todo -> filters store
const activeParams = {
  // gameseries: 'Yoshi\'s Woolly World',
  // character: 'Yoshi',
  gameseries: 'Super Mario',
  character: 'Mario',
};
const appState = {
  amiibos: [],
  gameseries: [],
  characters: [],
  activeParams,
  amiiboApi: new AmiiboApi(),

};

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_AMIIBOS:
      return (((({ ...state, amiibos: action.amiibos }))));
    case CHANGE_GAMESERIES:
      return ({ ...state, gameseries: action.gameseries });
    case CHANGE_ACTIVE_GAMESERIES:
      return (
        {
          ...state,
          activeParams: Object.assign(state.activeParams, {
            gameseries: action.activeGameseries,
          }),
        });
    case CHANGE_CHARACTERS:
      return { ...state, characters: action.characters };
    case CHANGE_ACTIVE_CHARACTER:
      return {
        ...state,
        activeParams: Object.assign(state.activeParams, {
          character: action.activeCharacter,
        }),
      };
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

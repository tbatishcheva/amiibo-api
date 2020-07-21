import React, {
  useCallback, useContext, useEffect, useReducer,
} from 'react';
import MainPageContext from '../../../contexts/MainPageContext';
import handleAmiiboAttr from '../../../helpers/handleAmiiboAttr';
import styles from './Filters.module.css';
import Select from '../../Select/Select';
import AppContext from '../../../contexts/AppContext';
import {
  CHANGE_ACTIVE_GAMESERIES,
  CHANGE_ACTIVE_CHARACTER, CHANGE_GAMESERIES, CHANGE_CHARACTERS,
} from '../../../constants/actionTypes';
import FilterContext from '../../../contexts/FilterContext';

const filterState = {
  gameseries: [],
  characters: [],
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_GAMESERIES:
      return { ...state, gameseries: handleAmiiboAttr(action.gameseries) };
    case CHANGE_CHARACTERS:
      return { ...state, characters: handleAmiiboAttr(action.characters) };
    default:
      return 'Error';
  }
};

function Filters() {
  const [state, filterDispatch] = useReducer(filterReducer, filterState);

  const { mainPageDispatch, activeParams } = useContext(MainPageContext);

  const { amiiboApi } = useContext(AppContext);

  const handleSelectGameseriesChange = useCallback((e) => {
    mainPageDispatch({
      type: CHANGE_ACTIVE_GAMESERIES,
      activeGameseries: e.currentTarget.value,
    });
  },
  [mainPageDispatch]);

  const handleSelectCharactersChange = useCallback((e) => {
    mainPageDispatch({
      type: CHANGE_ACTIVE_CHARACTER,
      activeCharacter: e.currentTarget.value,
    });
  },
  [mainPageDispatch]);

  const changeGameseries = useCallback((gameseriesRes) => {
    filterDispatch({
      type: CHANGE_GAMESERIES,
      gameseries: gameseriesRes,
    });
  },
  [filterDispatch]);
  const changeCharacters = useCallback((charactersRes) => {
    filterDispatch({
      type: CHANGE_CHARACTERS,
      characters: charactersRes,
    });
  },
  [filterDispatch]);

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
      <div className={styles.filters}>
        <Select
          className={styles.select}
          title="Select The GameSeries: &#160;"
          options={state.gameseries}
          onChange={handleSelectGameseriesChange}
          selected={activeParams.gameseries}
        />
        <Select
          className={styles.select}
          title="Select The Character: &#160;"
          options={state.characters}
          onChange={handleSelectCharactersChange}
          selected={activeParams.character}
        />
      </div>
    </FilterContext.Provider>
  );
}

export default Filters;

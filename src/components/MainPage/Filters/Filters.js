import React, { useCallback, useContext } from 'react';
import styles from './Filters.module.css';
import Select from '../../Select/Select';
import AppContext from '../../../contexts/AppContext';
import {
  CHANGE_ACTIVE_GAMESERIES,
  CHANGE_ACTIVE_CHARACTER,
} from '../../../constants/actionTypes';
import FilterContext from '../../../contexts/FilterContext';

function Filters() {
  const {
    activeParams,
    filterDispatch,
  } = useContext(FilterContext);

  const {
    gameseries,
    characters,
  } = useContext(AppContext);

  const handleSelectGameseriesChange = useCallback((e) => {
    filterDispatch({
      type: CHANGE_ACTIVE_GAMESERIES,
      activeGameseries: e.currentTarget.value,
    });
  },
  [filterDispatch]);

  const handleSelectCharactersChange = useCallback((e) => {
    filterDispatch({
      type: CHANGE_ACTIVE_CHARACTER,
      activeCharacter: e.currentTarget.value,
    });
  },
  [filterDispatch]);

  return (
    <div className={styles.filters}>
      <Select
        className={styles.select}
        title="Select The GameSeries: &#160;"
        options={gameseries}
        onChange={handleSelectGameseriesChange}
        selected={activeParams.gameseries}
      />
      <Select
        className={styles.select}
        title="Select The Character: &#160;"
        options={characters}
        onChange={handleSelectCharactersChange}
        selected={activeParams.character}
      />
    </div>
  );
}

export default Filters;

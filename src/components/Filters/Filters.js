import React, {useCallback, useContext} from 'react';
import styles from './Filters.module.css';
import Select from '../Select/Select';
import AppContext from '../../contexts/AppContext';
import {CHANGE_ACTIVE_GAMESERIES, CHANGE_ACTIVE_CHARACTER} from '../../constants/actionTypes';

function Filters() {
    const {gameseries, dispatch, characters} = useContext(AppContext);

    const handleSelectGameseriesChange = useCallback(
        (e) => {
            dispatch({
                type: CHANGE_ACTIVE_GAMESERIES,
                activeGameseries: e.currentTarget.value,
            })
        },
        [dispatch]);

    const handleSelectCharactersChange = useCallback(
        (e) => {
            dispatch({
                type: CHANGE_ACTIVE_CHARACTER,
                activeCharacter: e.currentTarget.value,
            })
        },
        [dispatch]);

    return (
        <div className={styles.filters}>
            // todo передать активный option selected
            <Select
                className={styles.select}
                title='Select The GameSeries: &#160;'
                options={gameseries}
                onChange={handleSelectGameseriesChange}
            />
            <Select
                className={styles.select}
                title='Select The Character: &#160;'
                options={characters}
                onChange={handleSelectCharactersChange}
            />
        </div>
    );
}

export default Filters;

import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../contexts/AppContext';
import Amiibo from '../../models/Amiibo';
import styles from './AmiiboItem.module.css';
import Button from '../Button/Button';
import { TOGGLE_LIKE } from '../../constants/actionTypes';

AmiiboItem.propTypes = {
  amiibo: PropTypes.instanceOf(Amiibo).isRequired,
};

function AmiiboItem({ amiibo }) {
  const { dispatch } = useContext(AppContext);

  const handleOnLikeClick = useCallback(() => {
    dispatch({
      type: TOGGLE_LIKE,
      amiibo,
    });
  }, [dispatch, amiibo]);

  return (
    <div className={styles.amiiboItem}>
      <div className={styles.img}>
        <img alt="Amiibo" src={amiibo.image} />

      </div>
      <div className={styles.content}>
        <div className={styles.character}>
          {amiibo.character}
        </div>
        <div className={styles.name}>
          {amiibo.name}
        </div>
        <div className={styles.amiiboSeries}>
          Amiibo Series: {amiibo.amiiboSeries}
        </div>
        <div className={styles.gameSeries}>
          Game Series: {amiibo.gameSeries}
        </div>
        <div className={styles.type}>
          Type: {amiibo.type}
        </div>
        <div className={styles.tail}>
          Tail: {amiibo.tail}
        </div>
        <div className={styles.controls}>
          <Button onClick={handleOnLikeClick}>Like</Button>
        </div>
        {/* {amiibo.release} +*/}
      </div>
    </div>
  );
}

export default AmiiboItem;

import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
import Amiibo from '../../models/Amiibo';
import styles from './AmiiboItem.module.css';
import Button, { NEUTRAL, RED } from '../Button/Button';
import { TOGGLE_LIKE } from '../../constants/actionTypes';

AmiiboItem.propTypes = {
  amiibo: PropTypes.instanceOf(Amiibo).isRequired,
};

function AmiiboItem({ amiibo }) {
  const { dispatch, likedAmiibosIds, getAmiiboId } = useContext(AppContext);

  const handleOnLikeClick = useCallback(() => {
    dispatch({
      type: TOGGLE_LIKE,
      amiibo,
    });
  }, [dispatch, amiibo]);

  const isLiked = useMemo(() => {
    const amiiboId = getAmiiboId(amiibo);

    return !!likedAmiibosIds.includes(amiiboId);
  }, [amiibo, likedAmiibosIds, getAmiiboId]);

  return (
    <div className={styles.amiiboItem}>
      <div>
        <Link className={styles.img} to={`/amiibo/${getAmiiboId(amiibo)}`}>
          <img alt="Amiibo" src={amiibo.image} />
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.character}>
          <Link className={styles.link} to={`/amiibo/${getAmiiboId(amiibo)}`}>
            {amiibo.character}
          </Link>
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
          <Button onClick={handleOnLikeClick} color={isLiked ? RED : NEUTRAL}>Like</Button>
        </div>
        {/* {amiibo.release} +*/}
      </div>
    </div>
  );
}

export default AmiiboItem;

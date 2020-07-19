import React, { useCallback, useContext, useEffect } from 'react';
import AmiiboList from '../AmiiboList/AmiiboList';
import Header from '../Header/Header';
import styles from './LikesPage.module.css';
import AppContext from '../../contexts/AppContext';
import { CHANGE_LIKED_AMIIBOS } from '../../constants/actionTypes';
import Loader from '../Loader/Loader';

function LikesPage() {
  const {
    dispatch, likedAmiibosIds, amiiboApi, likedAmiibos,
  } = useContext(AppContext);

  const changeLikedAmiibos = useCallback((amiibosRes) => {
    dispatch({
      type: CHANGE_LIKED_AMIIBOS,
      amiibosRes,
    });
  },
  [dispatch]);

  useEffect(() => {
    amiiboApi.fetchAmiibosByIds(likedAmiibosIds).then((res) => {
      changeLikedAmiibos(res.map((r) => r.amiibo));
    });
  }, [amiiboApi, changeLikedAmiibos, likedAmiibosIds]);

  return (
    <div className={styles.likesPage}>
      <Header />
      {!likedAmiibos && <Loader />}
      {likedAmiibos && likedAmiibos.length === 0 && <div>No Likes</div>}
      {likedAmiibos && likedAmiibos.length > 0 && <AmiiboList amiibos={likedAmiibos} />}
    </div>
  );
}

export default LikesPage;

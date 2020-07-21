import React, {
  useCallback, useContext, useEffect, useReducer,
} from 'react';
import AmiiboList from '../AmiiboList/AmiiboList';
import Header from '../Header/Header';
import styles from './LikesPage.module.css';
import AppContext from '../../contexts/AppContext';
import { CHANGE_LIKED_AMIIBOS } from '../../constants/actionTypes';
import Loader from '../Loader/Loader';
import handleAmiibosRes from '../../helpers/handleAmiibosRes';

const likedAmiibos = null;
const likesState = {
  likedAmiibos,
};

const likesReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_LIKED_AMIIBOS:
      return { ...state, likedAmiibos: handleAmiibosRes(action.amiibosRes) };
    default: return 'Error';
  }
};

function LikesPage() {
  const [state, likesDispatch] = useReducer(likesReducer, likesState);

  const { likedAmiibosIds, amiiboApi } = useContext(AppContext);

  const changeLikedAmiibos = useCallback((amiibosRes) => {
    likesDispatch({
      type: CHANGE_LIKED_AMIIBOS,
      amiibosRes,
    });
  },
  [likesDispatch]);

  useEffect(() => {
    amiiboApi.fetchAmiibosByIds(likedAmiibosIds).then((res) => {
      changeLikedAmiibos(res.map((r) => r.amiibo));
    });
  }, [amiiboApi, changeLikedAmiibos, likedAmiibosIds]);

  return (
    <div className={styles.likesPage}>
      <Header />
      {!state.likedAmiibos && <div className={styles.loader}><Loader /></div>}
      {state.likedAmiibos && state.likedAmiibos.length === 0 && <div>No Likes</div>}
      {state.likedAmiibos && state.likedAmiibos.length > 0 && <AmiiboList amiibos={state.likedAmiibos} />}
    </div>
  );
}

export default LikesPage;

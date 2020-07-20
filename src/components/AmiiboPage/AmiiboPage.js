import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import styles from './AmiiboPage.module.css';
import Header from '../Header/Header';
import AppContext from '../../contexts/AppContext';
import Amiibo from '../../models/Amiibo';

function AmiiboPage() {
  const { amiiboApi } = useContext(AppContext);

  const [amiibo, setAmiibo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    amiiboApi.fetchAmiibosById(id).then((res) => setAmiibo(new Amiibo(res.amiibo)));
  }, [amiiboApi, id]);

  return (
    <div className={styles.amiiboPage}>
      <Header />
      {!amiibo && <div className={styles.loader}><Loader /></div>}
      {amiibo && (
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.title}>
            {amiibo.character}
          </div>
          <div className={styles.image}>
            <img alt={amiibo.character} src={amiibo.image} />
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.left}>
            <div className={styles.item}>Amiibo Series: {amiibo.amiiboSeries}</div>
            <div className={styles.item}>Game Series: {amiibo.gameSeries}</div>
          </div>
          <div className={styles.right}>
            <div className={styles.item}>Type: {amiibo.type}</div>
            <div className={styles.item}>Tail: {amiibo.tail}</div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default AmiiboPage;

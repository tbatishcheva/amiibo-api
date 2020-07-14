import React from 'react';
import PropTypes from 'prop-types';
import AmiiboItem from '../AmiiboItem/AmiiboItem';
import styles from './AmiiboList.module.css';
import Amiibo from '../../models/Amiibo';

AmiiboList.propTypes = {
  amiibos: PropTypes.arrayOf(PropTypes.instanceOf(Amiibo)).isRequired,
};

function AmiiboList({ amiibos }) {
  if (!amiibos || amiibos.length === 0) {
    return null;
  }

  return (
    <div className={styles.amiiboList}>
      {amiibos.map((a) => <AmiiboItem key={a.tail} amiibo={a} />)}
    </div>
  );
}

export default AmiiboList;

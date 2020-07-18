import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.link} to="/">
        Amiibos
      </Link>
      <Link className={styles.link} to="/likes">
        Likes
      </Link>
    </header>
  );
}

export default Header;

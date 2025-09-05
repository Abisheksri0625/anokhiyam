import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>ANOKHIYAM</span>
        </div>

        <nav className={styles.navigation}>
          <a href="#overview" className={styles.navLink}>Overview</a>
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#about" className={styles.navLink}>About</a>
        </nav>

        <div className={styles.authSection}>
          <button className={styles.checkResultsBtn}>Check Results</button>
          <button className={styles.loginBtn}>Log In</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

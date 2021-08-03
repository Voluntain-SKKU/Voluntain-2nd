import React from 'react'
import { Grid, Link } from '@material-ui/core';

import styles from '../styles/Home.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Grid container direction='row' justifyContent='center' alignItems='flex-start' spacing={2}>
        <Grid item className={styles.footerItem}>
          <strong>EMAIL</strong> {' '}
          skku.voluntain@gmail.com
        </Grid>
        <Grid item className={styles.footerItem}>
          <strong>CONTACT</strong> {' '}
          +82-00-0000-0000
        </Grid>
        <Grid item className={styles.footerItem}>
          <strong><a href='./setting'>Cookie policy page</a></strong>
        </Grid>
        <Grid item>
          <strong><a href='https://www.youtube.com'>Youtube channel</a></strong>
        </Grid>
      </Grid>
      <div className={styles.copyright}>© 2021 Voluntain. All rights reserved.</div>
    </footer>
  );
}

import React from 'react'
import { Grid, Popover } from '@material-ui/core';
import { MailOutline, YouTube } from '@material-ui/icons';
import styles from '../styles/Home.module.css'

/**
 * 모든 페이지에 삽입되는 공통 Footer입니다.
 */
export const Footer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleEmail = (event) => {
    setAnchorEl(event.currentTarget);
    copyEmail();
  }
  const handleEmailClose = () => {
    setAnchorEl(null);
  }

  /**
   * 사용자가 Email 버튼을 눌렀을 때 실행되어,
   * 사용자 클립보드에 email.value 문자열을 복사합니다.
   */
  const copyEmail = () => {
    const email = document.createElement('textarea');
    document.body.appendChild(email);
    email.value = 'skku.voluntain@gmail.com'
    email.select();
    document.execCommand('copy');
    document.body.removeChild(email);
  }
  const openEmail = Boolean(anchorEl);

  return (
    <footer className={styles.footer}>
      <Grid container direction='row' justifyContent='center' alignItems='center' spacing={2}>
        <Grid item className={styles.footerItem}>
          <a href='#!' onClick={handleEmail}><MailOutline />{' '}Email Us</a>
          <Popover
            open={openEmail}
            anchorEl={anchorEl}
            onClose={handleEmailClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <div style={{ padding: 5 }}>Copied to clipboard: skku.voluntain@gmail.com</div>
          </Popover>
        </Grid>
        <Grid item className={styles.footerItem}>
          <a href='https://www.youtube.com/channel/UCYvzm_6k-_V4UHFjEMdFtuA'><YouTube />{' '}Youtube</a>
        </Grid>
        <Grid item>
          <a href='/setting'>Privacy Policy</a>
        </Grid>
      </Grid>
      <div className={styles.copyright}>© 2021 Voluntain. All rights reserved.</div>
    </footer>
  );
}

import React from 'react'
import { useCookies } from 'react-cookie'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Collapse, IconButton, Link } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import styles from '../styles/Home.module.css'

export function VideoStateChecker() {
  const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);
  const [openWarning, setOpenWarning] = React.useState(true);

  if (cookies.noCookie !== undefined) {
    // For ones who disabled cookies
    return (
      <div className={styles.videoStateChecker}>
        <Collapse in={openWarning}>
          <Alert
            severity="warning"
            action={<IconButton onClick={() => {setOpenWarning(false);}}><CloseIcon /></IconButton>}
          >
            <AlertTitle>Cookies are disabled</AlertTitle>
            Your video history is no longer recorded. <br />
            To enable cookies, please visit our <Link href="/setting"><strong>cookie policy page.</strong></Link>
          </Alert>
        </Collapse>
      </div>
    );
  } else if (cookies.lectureId !== undefined) {
    // For the re-visiters
    if (cookies.videoEnd == 1) {
      // provide a link to the next lecture if exists
      return (
        <div className={styles.videoStateChecker}>
          <Alert severity="success">
            <AlertTitle>Welcome back!</AlertTitle>
            Last time you have finishied the lecture {cookies.lectureId} of the course {cookies.courseId}. {' '}
            <Link href="/id"><strong>CLICK HERE TO GO FOR THE NEXT LECTURE</strong></Link>
          </Alert>
        </div>
      );
    } else {
      // provide a link to the recent lecture
      return (
        <div className={styles.videoStateChecker}>
          <Alert severity="info">
            <AlertTitle>Welcome back!</AlertTitle>
            You can continue studying the lecture {cookies.lectureId} of the course {cookies.courseId}. {' '}
            <Link href="/id"><strong>CLICK HERE TO GO FOR IT</strong></Link>
          </Alert>
        </div>
      );
    }
  } else if (cookies.noCookie == undefined){
    // For the first visiters
    return (
      <>
        <h2>Welcome!</h2>
        <p>Learn ~~</p>
      </>
    );
  }
}

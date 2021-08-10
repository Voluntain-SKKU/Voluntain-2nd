import React from 'react'
import { useCookies } from 'react-cookie'
import { Collapse } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import styles from '../styles/Home.module.css'

export function VideoStateChecker() {
  const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);
  const [openWarning, setOpenWarning] = React.useState(true);
  const handleClose = () => {
    removeCookie('courseId');
    removeCookie('lectureId');
    removeCookie('videoEnd');
    setOpenWarning(false);
  }

  if (cookies.noCookie !== undefined) {
    // For ones who disabled cookies
    return (
      <div className={styles.videoStateCheckerContainer}>
        <Collapse in={openWarning}>
          <div className={styles.videoStateChecker}>
            <h4>Cookie is disabled</h4>
            <p><>
            Your video history is no longer provided. <br />
            To enable cookies, please visit our <a href="/setting">privacy policy page.</a>
            </></p>
          </div>
          <CloseIcon onClick={() => setOpenWarning(false)}/>
        </Collapse >
      </div>
    );
  } else if (cookies.lectureId !== undefined) {
    // For the re-visiters
    if (cookies.videoEnd == 1) {
      // provide a link to the next lecture if exists
      return (
        <div className={styles.videoStateCheckerContainer}>
        <Collapse in={openWarning}>
          <div className={styles.videoStateChecker}>
            <h4>Keep going!</h4>
            <p><>
            You can continue studying <a href={"/course/" + cookies.courseId}>the next lecture.</a>
            </></p>
          </div>
          <CloseIcon onClick={handleClose}/>
        </Collapse >
      </div>
      );
    } else {
      // provide a link to the recent lecture
      return (
        <div className={styles.videoStateCheckerContainer}>
        <Collapse in={openWarning}>
          <div className={styles.videoStateChecker}>
            <h4>Continue your study</h4>
            <p><>
            You can continue studying <a href={"course/" + cookies.courseId}>the last lecture.</a>
            </></p>
          </div>
          <CloseIcon onClick={handleClose}/>
        </Collapse >
      </div>
      );
    }
  } else {
    // For the first visiters
    return (
      <>
      </>
    );
  }
}

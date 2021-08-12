import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Collapse } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';

export function MainCookieCard(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['lectureId', 'videoEnd', 'isLastLecture']);
  const [lectureTitle, setLectureTitle] = useState("");

  /**
   * Set lecture title only if there is history
   */
  React.useEffect(() => {
    if (cookies.lectureId !== undefined) {
      console.log(props.lectures);
      Object.keys(props.lectures).forEach(function (key) {
        console.log("Getting lecture #", props.lectures[key]['lecture_number']);
        if ((cookies.videoEnd != 1) && (props.lectures[key]['lecture_number'] == (cookies.lectureId))) {
          // when user has not finished the recent lecture
          console.log(`MATCH: the current lecture ${cookies.lectureId}`);
          setLectureTitle(props.lectures[key]['title']);
        } else if ((cookies.videoEnd == 1) && (cookies.isLastLecture != 1) && (props.lectures[key]['lecture_number'] == (cookies.lectureId + 1))) {
          // when user has finished the recent lecture, which is not the last one of the course.
          console.log(`MATCH: the next lecture ${cookies.lectureId + 1}`);
          setLectureTitle(props.lectures[key]['title']);
        }
      })
    }
  }, []);

  const [open, setOpen] = useState(true);
  function handleClose() {
    props.handleClose();
    setOpen(false);
  }

  const handleLinkClick = () => {
    let nextId = parseInt(cookies.lectureId) + 1
    if (cookies.lectureId !== undefined && cookies.videoEnd == 1 && cookies.isLastLecture != 1) {
      console.log(`setting cookie to the next lecture: ` + nextId);
      setCookie('lectureId', nextId, { path: '/', maxAge: 31536000 });
      setCookie('videoEnd', 0, { path: '/', maxAge: 31536000 });
    }
  }

  return (
    <Collapse in={open}>
      <Alert onClose={() => { handleClose() }} severity={props.severity} className={styles.cookiecard}>
        <span className={styles.text}>
          {props.title}
          &nbsp;&nbsp;
          <Button href={props.link} color='primary' onClick={handleLinkClick}>{lectureTitle ? lectureTitle : props.text}</Button>
        </span>
      </Alert>
    </Collapse>
  );
}

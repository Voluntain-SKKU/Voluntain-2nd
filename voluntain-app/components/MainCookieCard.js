import React, {useState} from 'react'
import { useCookies } from 'react-cookie'
import { Collapse } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from '../styles/Home.module.css'
import { Alert, AlertTitle } from '@material-ui/lab';

export function MainCookieCard( props ) {
  const [open, setOpen] = useState(true);
  function handleClick(){
    props.handleClose();
    setOpen(false);
  }
  return (
    <Collapse in={open}>
      <Alert onClose={() => {handleClick()}} severity={props.severity} className={styles.cookiecard}>
          <span className={styles.text}>
          {props.title}
          &nbsp;&nbsp;
          <a href={props.link}>{props.lectureTitle?props.lectureTitle:props.text}</a>
          </span>     
      </Alert>
    </Collapse>
  );
}

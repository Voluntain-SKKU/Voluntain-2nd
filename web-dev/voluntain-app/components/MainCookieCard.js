import React, {useState} from 'react'
import { useCookies } from 'react-cookie'
import { Collapse } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import CloseButton from 'react-bootstrap/CloseButton'
import styles from '../styles/Home.module.css'

export function MainCookieCard( props ) {
  const [open, setOpen] = useState(true);
  function handleClick(){
    props.handleClose();
    setOpen(false);
  }
  return (
    <Collapse in={open}>
      <Card className={styles.cookiecard}>
        <Card.Body>
        <Card.Title className={styles.title}>{props.title}</Card.Title>
        <Card.Text>
          {props.text}
        </Card.Text>
        <CloseButton aria-label="Hide" aria-expanded={open}
        onClick={()=> handleClick()} />
        </Card.Body>
      </Card>
    </Collapse>
  );
}

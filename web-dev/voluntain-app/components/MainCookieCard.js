import React, {useState} from 'react'
import { useCookies } from 'react-cookie'
import { Collapse } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
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
        <Card.Body style={{padding: '1.5rem', width: 'fit-content'}}>
        <Card.Title className={styles.title}>{props.title}</Card.Title>
        <a href={props.link}><Card.Text className={styles.text}>
          {props.text}
        </Card.Text> </a>
        </Card.Body>
        <Button className={styles.button} onClick={()=> handleClick()}>X</Button>
      </Card>
    </Collapse>
  );
}

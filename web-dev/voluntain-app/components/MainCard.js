import styles from '../styles/Home.module.css'
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'

export const MainCard = ()=> {
    return(
        <div className={styles.main}>
        <Card className={styles.card}>
            <Card.Img variant="top" src="/scratch.png" className={styles.cardimg}/>
            <Card.Body>
            <Card.Title class="fw-bold fs-2">SCRATCH</Card.Title>
            <Card.Text>
                With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Link href="/id" >
                <Button variant="primary">Click to learn</Button>
            </Link>
            </Card.Body>
        </Card>
        <Card className={styles.card}>
            <Card.Img variant="top" src="/python.jpg" className={styles.cardimg}/>
            <Card.Body>
            <Card.Title class="fw-bold fs-2">PYTHON</Card.Title>
            <Card.Text>
                With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Link href="/id" >
                <Button variant="primary">Click to learn</Button>
            </Link>
            </Card.Body>
        </Card>
      </div>
    );
};
import styles from '../styles/Home.module.css'
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'

{/* class=""으로 바로 css 적용 안됨 */}
/**
 * 
 * @param {*} props 
 * @Properties
 * - title
 * - img
 * - content
 * - link
 * - btntext
 * 
 * @returns 
 */
export const CourseCard = (props)=> {
    return(
        <div className={styles.main}>
        <Card className={styles.card}>
            <Card.Img variant="top" src={props.img} className={styles.cardimg}/>
            <Card.Body>
            <Card.Title className="fw-bold fs-2">{props.title}</Card.Title>
            <Card.Text className="py-2 mb-2">
                {props.content}
            </Card.Text>
            <Link href={props.link} >
                <Button variant="primary">{props.btntext}</Button>
            </Link>
            </Card.Body>
        </Card>
      </div>
    );
};
import styles from '../styles/Home.module.css'
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'

{/* class=""으로 바로 css 적용 안됨 */}
/**
 * 
 * @param {*} props 
 * @Properties
 * - title: 강좌 제목
 * - img: 강좌 아이콘 파일 경로
 * - content: 강좌 소개
 * - link: 강좌 페이지 링크 
 * - difficulty: 난이도 (1 ~ 5)
 * 
 * @returns 
 */
export const CourseCard = (props)=> {
    // const stars= [ " ", "★", "★ ★", "★ ★ ★", "★ ★ ★ ★", "★ ★ ★ ★ ★"]
    
    return(
        <div className={styles.main}>
            <Link href={props.link} >
            <Card className={styles.card}>
                <Card.Img variant="top" src={props.img} className={styles.cardimg}/>
                <Card.Body>
                <Card.Title className="fw-bold fs-2">{props.title}</Card.Title>
                <Card.Text className="py-2 mb-2">
                    {props.content}
                </Card.Text>
                <Card.Footer className="py-2 px-0 bg-transparent border-secondary">
                    Difficulty : { props.level } 
                </Card.Footer>
                </Card.Body>
            </Card>
            </Link>
      </div>
    );
};
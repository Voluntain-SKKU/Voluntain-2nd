import styles from '../styles/Home.module.css'
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link' // 속도 저하? 대신 a 태그 사용

/**
 * @note
 * 상위 MainCard 컴포넌트에서 전달받은 props를 나타내는 레이아웃 컴포넌트
 * @see MainCard
 * 
 * @param {*} props 
 * @properties
 * - title: course 제목
 * - img: course 아이콘 파일 경로
 * - content: 강좌 소개
 * - link: 강좌 페이지 링크 
 * - level: 난이도 (1 ~ 5)
 */
export const CourseCard = (props)=> {
    // 난이도에 따른 별 기호
    let stars = new Map([["easy", "★"], ["normal", "★ ★"], ["hard", "★ ★ ★"]]);

    return(
        <div className={styles.coursecard}>
            <a href={props.link}>
            <Card className={styles.maincard}>
                <Card.Img variant="top" src={props.img} className={styles.cardimg}/>
                <Card.Body>
                <Card.Title className={styles.title}>{props.title}</Card.Title>
                <Card.Text className={styles.text}>
                    {props.content}
                </Card.Text>
                <Card.Footer className="py-2 px-0 bg-transparent border-secondary">
                    Difficulty : { props.level } {' '} {stars.get(props.level)}
                </Card.Footer>
                </Card.Body>
            </Card>
            </a>
      </div>
    );
};

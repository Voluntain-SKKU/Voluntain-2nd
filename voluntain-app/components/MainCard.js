import styles from '../styles/Home.module.css'
import { CourseCard } from './CourseCard';
import { CardGroup } from 'react-bootstrap';
import {url} from '../config/next.config' //url 가져오기

/**
 * @note
 * 현재 등록된 course 정보를 백엔드에서 받아서 카드로 나타내는 컴포넌트
 * @see CourseCard
 * 
 * @param {*} props
 * @properties 
 * - courses: 등록된 course 정보
 */
export const MainCard = (props)=> {
    return(
        <div className={styles.content}>
        <span className={styles.contenttitle}>Courses</span>
        <CardGroup style={ {width: 'fit-content'} }>
            {/* courses 개수만큼 CourseCard 컴포넌트 생성 및 props 전달*/}
            {props.courses.map((course) => (
                    <CourseCard key={course.id}
                    title={course.title} 
                    img={`${url}`+course.logo_img.url}
                    content={course.about}
                    link={"/newcourse/" + course.id}
                    level={course.level}
                    />  
            ))}
        </CardGroup>
        </div>
    );
}
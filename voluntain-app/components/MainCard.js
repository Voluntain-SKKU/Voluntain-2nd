import styles from '../styles/Home.module.css'
import { CourseCard } from './CourseCard';
import { CardGroup } from 'react-bootstrap';
import {url} from '../config/next.config' //url 가져오기

/**
 * 
 * @param {*} props
 * @Properties 
 * - courses: 모든 course 정보
 *  
 * @returns 
 */
export const MainCard = (props)=> {

    return(
        <div className={styles.content}>
        <span className={styles.contenttitle}>Courses</span>
        <CardGroup style={ {width: 'fit-content'} }>
            {/* courses 개수만큼 CourseCard 컴포넌트 생성 및 props 전달*/}
            {props.courses.map((course) => (
                    <CourseCard 
                    title={course.title} 
                    img={`${url}`+course.logo_img.url}
                    content={course.about}
                    link={"/course/" + course.id}
                    level={course.level}
                    />  
            ))}
        </CardGroup>
        </div>
    );
}
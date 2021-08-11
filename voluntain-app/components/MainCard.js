import styles from '../styles/Home.module.css'
import { CourseCard } from './CourseCard';
import CardColumns from 'react-bootstrap/CardColumns'
import { CardGroup } from 'react-bootstrap';
import {url} from '../config/next.config' //url 가져오기

export const MainCard = (props)=> {

    return(
        <div className={styles.content}>
        <span className={styles.contenttitle}>Courses</span>
        <CardGroup style={ {width: 'fit-content'} }>
            {/* get course inform from backend */}
            {props.courses.map((course) => (
                    <CourseCard 
                    title={course.title} 
                    img={`${url}`+course.logo_img.url}
                    content={course.about}
                    link={"/course/" + (course.id==undefined?'landing':course.id)}
                    level={course.level}
                    />  
            ))}
        </CardGroup>
        </div>
    );
}
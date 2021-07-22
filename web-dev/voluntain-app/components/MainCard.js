import styles from '../styles/Home.module.css'
import { CourseCard } from './CourseCard';
import CardColumns from 'react-bootstrap/CardColumns'

export const MainCard = (props)=> {

    return(
        <CardColumns>
            {/* get course inform from backend */}
        {props.courses.map((course) => (
            <CourseCard
            title={course.title} 
            img={"/"+course.title+".png"}
            content={course.about}
            link={"/" + course.id}
            level={course.level}
            />  
          ))}
        </CardColumns>
    );
}
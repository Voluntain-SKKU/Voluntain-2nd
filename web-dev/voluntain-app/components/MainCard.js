import styles from '../styles/Home.module.css'
import { CourseCard } from './CourseCard';
import CardColumns from 'react-bootstrap/CardColumns'
import {url} from '../config/next.config' //url 가져오기

export const MainCard = (props)=> {

    return(
        <CardColumns>
            {/* get course inform from backend */}
        {props.courses.map((course) => (
            <CourseCard
            title={course.title}
            img={`${url}`+course.logo_img.url}
            //img={"/"+course.title+".png"}
            content={course.about}
            link={"/" + course.id}
            level={course.level}
            />  
          ))}
        </CardColumns>
    );
}
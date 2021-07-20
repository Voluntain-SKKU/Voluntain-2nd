import styles from '../styles/Home.module.css'
import { CourseCard } from './CourseCard';
import CardColumns from 'react-bootstrap/CardColumns'

export const MainCard = ()=> {
    return(
        <CardColumns>
            <CourseCard
            title="SCRATCH" 
            img="/scratch.png"
            content="Let's learn Scratch basic"
            link="/id"
            dif={2}
            />  
            <CourseCard 
            title="PYTHON" 
            img="/python.jpg"
            content="Let's learn Python basic"
            link="/id"
            dif={4}
            />  
        </CardColumns>
    );
};
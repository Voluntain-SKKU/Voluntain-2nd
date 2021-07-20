import styles from '../styles/Home.module.css'
import { CourseCard } from './CourseCard';

export const MainCard = ()=> {
    return(
        <div>
            <CourseCard
            title="SCRATCH" 
            img="/scratch.png"
            content="Let's learn Scratch basic"
            link="/id"
            btntext="Click to learn!"/>  
            <CourseCard 
            title="PYTHON" 
            img="/python.jpg"
            content="Let's learn Python basic"
            link="/id"
            btntext="Click to learn!"/>  
        </div>
    );
};
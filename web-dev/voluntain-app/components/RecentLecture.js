/**
 * Obsolete,
 * merged to VideoStateChecker.
 */
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useCookies } from 'react-cookie'
import React, {useState, useEffect} from 'react'
import { MainCookieCard } from './MainCookieCard';

/**
 * VideoStateChecker 로직 수정
 */
export const RecentLecture = ( {lecture} ) => {
    const [title, setTitle] = useState("Nothing to continue");
    const [text, setText] = useState("Select the course below.");
    const [link, setLink] = useState("/");

    const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);
    const handleClose = () => {
        removeCookie('courseId');
        removeCookie('lectureId');
        removeCookie('videoEnd');
    };

    useEffect(() => {
        if (cookies.noCookie !== undefined) {
            setTitle("Disable Cookies");
            setText("To enable cookies, please visit our privacy policy page.");
            setLink("/setting/");
        }
        else if (cookies.lectureId !== undefined) {
            if (cookies.videoEnd == 1) {
                setTitle("Keep going!");
                setText("You can continue studying the next lecture (click here!)");
                setLink("/course/" + cookies.courseId);
            }
            else{
                setTitle("Continue your study!");
                setText("You can continue studying the last lecture (click here!)");
                setLink("/course/" + cookies.courseId);
            }
        }
    });
    // cookie 값이 없으면 아예 나타내지 않음
    // if 문을 사용하면 레이아웃이 깨지는 듯 함
    // if(cookies.lectureId == undefined) return (<> </>)
    return (
        <div className={styles.content}>
            <span className={styles.contenttitle}>Continue Learning</span>
            <div>{lecture}</div>
            <MainCookieCard
                title={title}
                text={text}
                link={link}
                // lectureTitle={lecture['title']}
                handleClose={handleClose}
            />
        </div>
    );
};

// 해당 course에서 특정 lecture 찾기
const find_lectureTitle = (course) =>{
    for(lec in course[lectures]){
        console.log('sadfasdf',lec);
        if(lec[lecture_num] == cookies.lectureId){
            return lec;
        }
    }
    return null;
}

// main cookie card에서 추천 강의 제목 가져오기
export const getStaticProps = async () => {
    const data = await fetch(`${url}/courses/${cookies.courseId}`);
    const course = await data.json();

    // cookie 값에 기록된 lecture_num으로 해당되는 강의 찾기
    const lecture = find_lectureTitle(course);
    
    return {
      props: { lecture },
    };
  };
  
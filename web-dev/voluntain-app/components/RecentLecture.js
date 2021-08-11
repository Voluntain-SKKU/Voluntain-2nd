/**
 * Obsolete,
 * merged to VideoStateChecker.
 */
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useCookies } from 'react-cookie'
import React, {useState, useEffect} from 'react'
import { MainCookieCard } from './MainCookieCard';


// 해당 course에서 특정 lecture 찾기
// const findLecture = (lectures) =>{
//     console.log('findlecture', lectures);
//     for(var lec in lectures){
//         console.log('sadfasdf', lec);
//         if(lec['lecture_num'] == cookies.lectureId+1){
//             console.log('title: ', lec['title'])
//             return lec['title'];
//         }
//     }
//     return null;
// }

/**
 * VideoStateChecker 로직 수정
 */
export const RecentLecture = ( props ) => {
    const [title, setTitle] = useState("Nothing to continue");
    const [text, setText] = useState("Select the course below.");
    const [link, setLink] = useState("/");

    const [lectureTitle, setLectureTitle] = useState("");

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
                setTitle("Recommend you to watch");
                setText("You can continue studying the next lecture (click here!)");
                setLink("/course/" + cookies.courseId);
            }
            else{
                setTitle("You are watching");
                setText("You can continue studying the last lecture (click here!)");
                setLink("/course/" + cookies.courseId);
            }
        }
        // cookie 값에 기록된 lecture_num으로 해당되는 강의 찾기
        // setLectureTitle(findLecture(props.lectures));
        // for(let i=0; i<props.lectures.length; i++ ){
        //     if(lectures[i].lecture_num == cookies.lectureId+1){
        //         console.log('title: ', lectures[i].lecture_num)
        //     }
        // }
        Object.keys(props.lectures).forEach(function(key){
            console.log("****", props.lectures[key]['lecture_number']);
            if(props.lectures[key]['lecture_number'] == (cookies.lectureId) ){
                setLectureTitle(props.lectures[key]['title']);
            }
        })
    });
    // cookie 값이 없으면 아예 나타내지 않음
    // if 문을 사용하면 레이아웃이 깨지는 듯 함
    // if(cookies.lectureId == undefined) return (<> </>)
    return (
        <div className={styles.content}>
            <span className={styles.contenttitle}>Continue Learning</span>
            <MainCookieCard
                title={title}
                text={text}
                link={link}
                lectureTitle={lectureTitle}
                handleClose={handleClose}
            />
        </div>
    );
};
  
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
    const [title, setTitle] = useState("Select the course below.");
    const [text, setText] = useState("");
    const [link, setLink] = useState("");
    const [contenttitle, setContenttitle] = useState("Continue Learning");
    
    const [lectureTitle, setLectureTitle] = useState("");
    
    const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie', 'isLastLecture']);
    const handleClose = () => {
        removeCookie('courseId');
        removeCookie('lectureId');
        removeCookie('videoEnd');
    };
    let nextId = cookies.lectureId + 1

    useEffect(() => {
        if (cookies.noCookie !== undefined) {
            setTitle("Cookies are disabled");
            setText("To enable cookies, please visit our privacy policy page.");
            setLink("/setting/");
        }
        else if (cookies.lectureId !== undefined) {
            if (cookies.videoEnd == 1) {
                if(cookies.isLastLecture == 1){ 
                    // 마지막 강의를 끝까지 다 들었을 때
                    setTitle("Congratulations");
                    setText("You finished a course!");
                    // 다른 코스 추천 안함
                }
                else{
                // 마지막 강의가 아닐 때
                    setTitle("Recommend you to watch");
                    setLink("/course/" + cookies.courseId);
                }
            }
            else{
                setTitle("You are watching");
                setLink("/course/" + cookies.courseId);
            }
        }
        if(cookies.videoEnd != 1 || cookies.isLastLecture != 1){
            Object.keys(props.lectures).forEach(function(key){
                console.log("****", props.lectures[key]['lecture_number']);
                if(props.lectures[key]['lecture_number'] == (cookies.lectureId) ){
                    setLectureTitle(props.lectures[key]['title']);
                }
            })
        }
        if(cookies.lectureId == undefined) setContenttitle("Enjoy your learning!")
    }, []);
    // cookie 값이 없으면 아예 나타내지 않음
    // if 문을 사용하면 레이아웃이 깨지는 듯 함
    return (
        <div className={styles.content}>
            <span className={styles.contenttitle}>{contenttitle}</span>
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
  
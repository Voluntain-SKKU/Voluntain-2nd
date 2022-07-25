import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useCookies } from 'react-cookie'
import React, { useState, useEffect } from 'react'
import { MainCookieCard } from './MainCookieCard';

/**
 * @note 
 * 사용자가 마지막 시청 정보에 따라, 덜 본 강의를 추천하거나 다음 강의를 추천하는
 * 메인 페이지의 컴포넌트입니다.
 * @see MainCookieCard
 * 
 * @param {*} props
 * @property
 * - lectures: index.js에서 받아온 특정 course에 대한 lectures 정보
 * 
 * @case 
 * cookie 유형 분류
 * - 1. cookie 비동의
 * - 2. 마지막 강의 시청 완료
 * - 3. (마지막 강의가 아닌 다른) 강의 시청 완료
 * - 4. (어떤 강의든) 시청 중
 * - 5. cookie 비동의는 아니지만 쿠키 값이 없을 때
*/
export const RecentLecture = (props) => {
    /**
     * 첫 렌더링 시 쿠키 값을 정상적으로 전달받지 못해 기본값으로 렌더링합니다.
     * 이후 쿠키 값을 처리한 후 index.js에서 새로운 props을 주면
     * 다시 렌더링합니다.
     */
    const [lectures, setLectures] = React.useState(props.lectures);
    React.useEffect(() => {
        setLectures(props.lectures);
    }, [props]);

    // MainCookieCard에 props로 넘겨줄 정보
    const [title, setTitle] = useState("Select the course below.");
    const [text, setText] = useState("");
    const [link, setLink] = useState("");
    const [contenttitle, setContenttitle] = useState("Continue Learning");
    const [severity, setSeverity] = useState("warning");

    const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie', 'isLastLecture']);
    const handleClose = () => {
        removeCookie('courseId');
        removeCookie('lectureId');
        removeCookie('videoEnd');
        removeCookie('isLastLecture');
    };

    useEffect(() => {
        if (cookies.noCookie !== undefined) {
             // case 1. 쿠키 비동의
            setTitle("Cookies are disabled");
            setText("To enable cookies, please visit our privacy policy page.");
            setLink("/setting/");
        }
        else if (cookies.lectureId !== undefined) {
            if (cookies.videoEnd == 1) {
                setSeverity("success")
                if (cookies.isLastLecture == 1) {
                    // case 2. 마지막 강의 시청 완료
                    setTitle("Congratulations");
                    setText("You finished a course!");
                    // 다른 코스 추천 안함
                }
                else {
                    // case 3. 마지막이 아닌 강의 시청 완료
                    setTitle("Recommend you to watch");
                    setLink("/lecture/" + cookies.courseId);
                }
            }
            else {
                // case 4. 시청 중
                setTitle("You are watching");
                setLink("/lecture/" + cookies.courseId);
                setSeverity("info");
            }
        }
        // case 5. 쿠키 값 없음
        if (cookies.lectureId == undefined) setContenttitle("Enjoy your learning!")
    }, []);
    return (
        <div className={styles.content}>
            <span className={styles.contenttitle}>{contenttitle}</span>
            <MainCookieCard
                lectures={lectures}
                severity={severity}
                title={title}
                text={text}
                link={link}
                handleClose={handleClose}
            />
        </div>
    );
};

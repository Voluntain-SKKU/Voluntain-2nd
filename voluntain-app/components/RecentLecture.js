import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useCookies } from 'react-cookie'
import React, { useState, useEffect } from 'react'
import { MainCookieCard } from './MainCookieCard';

/**
 * 사용자가 마지막 시청 정보에 따라, 덜 본 강의를 추천하거나 다음 강의를 추천하는
 * 메인 페이지의 컴포넌트입니다.
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
            setTitle("Cookies are disabled");
            setText("To enable cookies, please visit our privacy policy page.");
            setLink("/setting/");
        }
        else if (cookies.lectureId !== undefined) {
            if (cookies.videoEnd == 1) {
                setSeverity("success")
                if (cookies.isLastLecture == 1) {
                    // 마지막 강의를 끝까지 다 들었을 때
                    setTitle("Congratulations");
                    setText("You finished a course!");
                    // 다른 코스 추천 안함
                }
                else {
                    // 마지막 강의가 아닐 때
                    setTitle("Recommend you to watch");
                    setLink("/course/" + cookies.courseId);
                }
            }
            else {
                setTitle("You are watching");
                setLink("/course/" + cookies.courseId);
                setSeverity("info");
            }
        }

        if (cookies.lectureId == undefined) setContenttitle("Enjoy your learning!")
    }, []);
    // cookie 값이 없으면 아예 나타내지 않음
    // if 문을 사용하면 레이아웃이 깨지는 듯 함
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

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
export const RecentLecture = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [link, setLink] = useState("");

    const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);
    const [openWarning, setOpenWarning] = React.useState(true);
    const handleClose = () => {
        removeCookie('courseId');
        removeCookie('lectureId');
        removeCookie('videoEnd');
        setOpenWarning(false);
    };

    useEffect(() => {
        if (cookies.noCookie !== undefined) {
            setTitle("Cookie is disable");
            setText("To enable cookies, please visit our privacy policy page.");
            setLink("/setting/");
        }
        else if (cookies.lectureId !== undefined) {
            if (cookies.videoEnd == 1) {
                setTitle("Keep going!");
                setText("You can continue studying the next lecture.");
                setLink("/course/" + cookies.courseId);
            }
            else{
                setTitle("Continue your study!");
                setText("You can continue studying the last lecture.");
                setLink("/course/" + cookies.courseId);
            }
        }
    });
    // cookie 값이 없으면 아예 나타내지 않음
    if(cookies.lectureId == undefined) return (<> </>)
    
    return (
        <div className={styles.content}>
            <span className={styles.contenttitle}>Continue Learning</span>
            <MainCookieCard
                title={title}
                text={text}
                link={link}
                handleClose={handleClose}
            />
        </div>
    );
};

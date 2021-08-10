/**
 * Obsolete,
 * merged to VideoStateChecker.
 */
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useCookies } from 'react-cookie'
import React from 'react'

import { VideoStateChecker } from './VideoStateChecker';

/**
 * cookie 정보 가져오기
 */
export const RecentLecture = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);
    // const [openWarning, setOpenWarning] = React.useState(true)

    if (cookies.lectureId == undefined){
        return (<></>)
    }
    else{
        return (
            <div className={styles.content}>
                <span className={styles.contenttitle}>Continue Learning</span>
                <VideoStateChecker />
            </div>
        );
    }
};

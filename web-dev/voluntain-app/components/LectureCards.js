import React from 'react'
import styles from '../styles/Home.module.css'

/**
 * @usage
 * \<LectureCards title="TITLE" content={"CONTENT \nCONTENT2"} \/\>
 * 
 * @note
 * To make a newline in content, insert \n.
 * When using Strapi API, there is no need to specify \n.
 */
export const LectureCards = (props) => {
    return (
        <div className={styles.lectureCards}>
            <h3>{props.title}</h3>
            <h5>{props.content.split('\n').map((line) => {
                return <>{line}<br /></>
            })}</h5>
        </div>
    );
}

import React from 'react'
import styles from '../styles/Home.module.css'

/**
 * 강의 페이지에서 사용되는 강의 정보 카드입니다.
 * 
 * @usage
 * \<LectureCards title="TITLE" content={"CONTENT \nCONTENT2"} \/\>
 * 
 * @note
 * 디버깅 시 개행문자를 삽입하려면 문자열에 \n을 포함시킵니다.
 * Strapi를 사용할 경우, 줄바꿈이 \n의 역할을 하므로 따로 명시할 필요는 없습니다.
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

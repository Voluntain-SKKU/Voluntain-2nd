import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Collapse } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';

/**
 * @note
 * 상위 RecentLecture 컴포넌트에서 전달받은 props를 나타내는 레이아웃 컴포넌트
 * @see RecentLecture
 * 
 * @param {*} props
 * @property
 * - lectures: 상위 컴포넌트에서 받아온 lectures 정보
 * - severity: material-ui Alert 컴포넌트의 (심각도) 바탕 색, 로고 결정
 * - title: 표시하려는 lecture title
 * - text: 표시하려는 설명
 * - link: 클릭했을 대 연결되는 링크 (표시하려는 lecture 페이지)
 * - handleClose(): x 표시를 클릭했을 때 실행되는 함수 (쿠키 삭제)
 */

export function MainCookieCard(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['lectureId', 'videoEnd', 'isLastLecture']);
  const [lectureTitle, setLectureTitle] = useState("");

  /**
   * 시청 기록이 쿠키에 남아있을 경우, lectureTitle 상태값을 설정합니다.
   * 
   * 첫 렌더링 시 쿠키 값을 정상적으로 전달받지 못해 기본값으로 렌더링합니다.
   * 이후 쿠키 값을 처리한 후 index.js - RecentLecture.js에서 새로운 props을 주면
   * 다시 렌더링합니다.
   */
  React.useEffect(() => {
    console.log(`Updating MainCookieCard...`);
    if (cookies.lectureId !== undefined) {
      console.log(props.lectures);
      Object.keys(props.lectures).forEach(function (key) {
        console.log("Getting lecture #", props.lectures[key]['lecture_number']);
        if ((cookies.videoEnd != 1) && (props.lectures[key]['lecture_number'] == (cookies.lectureId))) {
          // 사용자가 최근 강의를 끝내지 않았을 경우
          // 그 강의를 다시 추천합니다.
          console.log(`MATCH: the current lecture ${cookies.lectureId}`);
          setLectureTitle(props.lectures[key]['title']);
        } else if ((cookies.videoEnd == 1) && (cookies.isLastLecture != 1) && (props.lectures[key]['lecture_number'] == (cookies.lectureId + 1))) {
          // 사용자가 최근 강의를 마쳤고, 그 강의가 해당 코스의 마지막 강의가 아닌 경우
          // 다음 강의를 추천합니다.
          console.log(`MATCH: the next lecture ${cookies.lectureId + 1}`);
          setLectureTitle(props.lectures[key]['title']);
        }
      })
    }
  }, [props]);

  const [open, setOpen] = useState(true);
  function handleClose() {
    props.handleClose();
    setOpen(false);
  }

  /**
   * 사용자가 최근 강의를 마쳤고, 그 강의가 해당 코스의 마지막 강의가 아닌 경우
   * 다음 강의로 바로 이동하려고 링크를 클릭했을 때 실행됩니다.
   * 
   * cookies.lectureId 값을 1 증가시켜 강의 페이지에서 다음 강의를 표시하도록 합니다.
   * 또한 cookies.videoEnd 값을 0으로 만들어
   * 사용자가 다시 메인 페이지로 돌아가는 예외 상황을 대비합니다.
   */
  const handleLinkClick = () => {
    let nextId = parseInt(cookies.lectureId) + 1
    if (cookies.lectureId !== undefined && cookies.videoEnd == 1 && cookies.isLastLecture != 1) {
      console.log(`setting cookie to the next lecture: ` + nextId);
      setCookie('lectureId', nextId, { path: '/', maxAge: 31536000 });
      setCookie('videoEnd', 0, { path: '/', maxAge: 31536000 });
    }
  }

  return (
    <Collapse in={open}>
      <Alert onClose={() => { handleClose() }} severity={props.severity} className={styles.cookiecard}>
        <span className={styles.text}>
          {props.title}
          &nbsp;&nbsp;
          <Button href={props.link} color='primary' onClick={handleLinkClick}>{lectureTitle ? lectureTitle : props.text}</Button>
        </span>
      </Alert>
    </Collapse>
  );
}

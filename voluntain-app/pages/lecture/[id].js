import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { url } from '../../config/next.config'
import Youtube from 'react-youtube';
import Router from 'next/router';
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { DiscussionEmbed } from "disqus-react";
import { useCookies } from 'react-cookie'


import { Button, Collapse, Drawer, Fab, List, ListItem, ListItemText, Hidden } from '@material-ui/core'
import { useWindowSize } from '../../components/useWindowSize';

import { LectureCards } from '../../components/LectureCards'

export default function Home({ course, course2 }) {

  const size = useWindowSize();

  /**
   * States to handle cookies.
   * @see https://www.npmjs.com/package/react-cookie
   */
   const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);

  /*const [lectureId, setLectureId] = useState(0);*/
  // disqus 설정
  const disqusShortname = "skku-voluntain"
  const disqusConfig = {
    url: "http://localhost:3000/newcourse/" + course.id,
    identifier: course.id + '',
    title: course.title // Single post title
  }
  
  //move to the course page of the lecture
  const handleClick = (e) => {
    e.preventDefault()
    var link = "/newcourse/" + course2.id;
    Router.push(link);
  };

  //move to the main
  const handleClick2 = (e) => {
    e.preventDefault()
    Router.push('/');
  }

  /**
   * 유튜브 API에 전달할 옵션 값입니다.
   * 플레이어 주변에 충분한 여백을 확보하기 위해, 실제 브라우저 크기보다 height,
   * width 값을 약간 작게 만들어야 합니다.
   * @see https://developers.google.com/youtube/player_parameters
   */
  const opts = {
    height: size.height > 650 ? '400' : size.height - 100,
    width: size.width > 1050 ? '700' : size.width - 4000,
    playerVars: {
      // To check other variables, check:
      // https://developers.google.com/youtube/player_parameters
      cc_load_policy: 1,
      modestbranding: 1,
    }
  }

  //exercise link button을 위한 state
  const [targetPlayer, setTargetPlayer] = useState({});
  //exercise link button 관련 함수
  ////현재 lecture의 video를 targetPlayer에 저장 (player 로드 완료시 실행됨)
  const onPlayerReady = (event) => {
    setTargetPlayer(targetPlayer => event.target);
  }

  ////현재 lecture video에서 exercise answer가 재생되는 시간으로 이동 (button 클릭시 실행됨)
  const toExercise = (event) => {

    targetPlayer.seekTo(course.exercise_answer, true);

  }

  const handleVideoEnd = () => {
    if (cookies.noCookie === undefined)
      setCookie('videoEnd', 1, { path: '/', maxAge: 31536000 });
  }
  const [lectureId, setLectureId] = useState(0);
  const [isFirstLecture, setFirstLecture] = useState(1);
  const [isLastLecture, setLastLecture] = useState(course.length == 1 ? 1 : 0);

  /**
   * 유튜브 API에서 비디오 시작이 감지될 경우 시행되어 쿠키 값을 설정합니다.
   * - cookies.courseId를 현재 코스 id로 설정
   * - cookies.lectureId를 현재 강의 id로 설정
   * - cookies.videoEnd를 0으로 설정
   * - cookies.isLastLecture를 현재 상황에 맞게 설정
   * 
   * @require Youtube object의 onPlay prop으로서 주어져야 합니다.
   */
  const handleVideoStart = () => {
    if (cookies.noCookie == undefined) {
      setCookie('courseId', course2.id, { path: '/', maxAge: 31536000 });
      setCookie('lectureId', course.id, { path: '/', maxAge: 31536000 });
      setCookie('videoEnd', 0, { path: '/', maxAge: 31536000 });
      setCookie('isLastLecture', isLastLecture, { path: '/', maxAge: 31536000 });
    }
  }

  /**
   * 첫 렌더링 이후에 한 번만, 브라우저에 저장된 cookies.lectureId 값에 접근하여
   * 표시되는 강의를 바꿔줍니다.
   * 그에 맞춰 이전 강의, 다음 강의 버튼 값도 바꿔줍니다.
   * 
   * 또한 사이드바의 세부 강의 목록을 열어줍니다.
   */
   React.useEffect(() => {
    if (cookies.lectureId !== undefined && cookies.courseId == course.id) {
      console.log(`Loading the recent history...`);
      setLectureId(cookies.lectureId);
      setFirstLecture(cookies.lectureId == 0 ? 1 : 0);
      setLastLecture(cookies.lectureId == course.length - 1 ? 1 : 0);
    }
  }, []);

  const list2 = () => (
    <div>
      {course2.lectures.map((element, index) => {
        var active;
        if (element.id == course.id) {
          active = "list-group-item list-group-item-action active"
        } else {
          active = "list-group-item list-group-item-action"
        }
        return (
          <ul className="list-group" key={index}>
            <li className={active}>
              <div className={styles.courselist}>
                <div clasName="ms-2 me-auto">
                  <div className="fw-bold">
                    <Link href={"/lecture/" + (element.id == undefined ? 'landing' : element.id)}>
                      <h6>{element.title}</h6>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        )
      })}
    </div>
  );

  return (
    <div>
      <Head>
        <title>{course.title}</title>
      </Head>
      <div className="d-md-flex align-items-stretch mx-5">
        <Hidden smDown>
          <nav className="px-1 pt-5 my-1 py-1 text-center border-bottom">
            <h1 className="display-4 fw-bold">&nbsp;Lectures&nbsp;</h1>
            {list2()}
          </nav>
        </Hidden>
        <div className="px-2 pt-5 my-2 text-center border-bottom">
          <div className={styles.course} >
            <h1 className="display-4 fw-bold">{course.title}</h1>
            <div className="col-lg-6 mx-auto">
              <p className="lead mb-4 text-center">{course.about}</p>
              <div className={styles.videoresponsive}>
                <Youtube videoId={course.video_link} opts={opts} onReady={onPlayerReady} onPlay={handleVideoStart} onEnd={handleVideoEnd}  />
              </div>
              <br></br>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={(e) => handleClick(e)}>
                  Go back to course
                </button>
                <Button variant="contained" color="primary" onClick={toExercise}>Check Answer</Button>
              </div>
            </div>
          </div>
          <div className={styles.lectureCardContainer}>
            {/*<div className={styles.lectureCardsRow}>
              <LectureCards
                title='Lecture Info'
                content={course.about}
              />
            </div>*/}
            <div className={styles.lectureCardsRow}>
              <LectureCards
                title='Exercise'
                content={course.exercise_question}
              />
            </div>
            {/* disqus */}
            <div style={{ width: '100%' }}>
              <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// send GET Request to {url}/lectures and get course list
export const getStaticProps = async (context) => {
  const data = await fetch(`${url}/lectures/${context.params.id}`);
  const course = await data.json();

  const data2 = await fetch(`${url}/courses/${course.course.id}`);
  const course2 = await data2.json();

  return {
    props: { course, course2 },
    revalidate: 1,
  };
};

// send GET Request to {url}/lectures and get course list
export async function getStaticPaths() {
  const res = await fetch(`${url}/lectures`);
  const courses = await res.json();

  const paths = courses.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return { paths, fallback: false };
};
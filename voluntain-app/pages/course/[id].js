import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { url } from "../../config/next.config";

import { useCookies } from 'react-cookie'
import { DiscussionEmbed } from "disqus-react"

import { Button, Collapse, Drawer, Fab, List, ListItem, ListItemText, Hidden } from '@material-ui/core'

import Youtube from 'react-youtube'
import { useWindowSize } from '../../components/useWindowSize';

import { NavigationBar } from '../../components/NavigationBar'
import { LectureCards } from '../../components/LectureCards'
import styles from '../../styles/Home.module.css'

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/List';

/**
 * 강의 페이지입니다.
 * getStaticPath에서 이 페이지의 URL을 결정하게 됩니다.
 * e.g. 1번 코스일 경우 localhost:3000/course/1,
 *      2번 코스일 경우 localhost:3000/course/2
 */
export default function LecturePage({ course, titles }) {
  /**
   * States to handle cookies.
   * @see https://www.npmjs.com/package/react-cookie
   */
  const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);

  //for exercise link
  const [targetPlayer, setTargetPlayer] = useState({});

  /**
   * lectureId는 현재 코스에서 어떤 강의를 표시할지 결정합니다. 시작값은 0입니다.
   * isFirstLecture가 1일 경우, 이전 강의 버튼을 비활성화합니다.
   * isLastLecture가 1일 경우, 다음 강의 버튼을 비활성화합니다.
   * 
   * 첫 페이지 렌더링 시 서버 사이드에서는 브라우저에 저장된 쿠키 값에 접근할
   * 수 없으므로, 유저가 첫 강의(0번)에 접근한다고 가정하고 아래와 같이 초기화
   * 합니다.
   */
  const [lectureId, setLectureId] = useState(0);
  const [isFirstLecture, setFirstLecture] = useState(1);
  const [isLastLecture, setLastLecture] = useState(course.lectures.length == 1 ? 1 : 0);

  /**
   * 브라우저 크기에 맞게 비디오 플레이어 크기를 조절하기 위한 상태값입니다.
   * @requires ../components/useWindowSize.js
   */
  const size = useWindowSize();

  /**
   * 유튜브 API에 전달할 옵션 값입니다.
   * 플레이어 주변에 충분한 여백을 확보하기 위해, 실제 브라우저 크기보다 height,
   * width 값을 약간 작게 만들어야 합니다.
   * @see https://developers.google.com/youtube/player_parameters
   */
  const opts = {
    height: size.height > 650 ? '600' : size.height - 50,
    width: size.width > 1050 ? '900' : size.width - 250,
    playerVars: {
      cc_load_policy: 1,
      modestbranding: 1,
    }
  }

  /**
   * 사이드바에서 세부 강의 목록을 보여줄지 결정하는 상태값입니다.
   * 초기값을 open(true)으로 줄 경우 렌더링 문제가 발생하여,
   * 부득이하게 초기값을 false로 주고, 렌더링 이후 useEffect에서 열어줍니다.
   */
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const responsivesidebar = () => {
    setOpenSidebar(!openSidebar)
  };

  //exercise 관련 함수
  //현재 video 저장
  const onPlayerReady = (event) => {
    setTargetPlayer(targetPlayer => event.target);
  }

  //exercise answer 시간으로 이동
  const toExercise = (e) => {
    e.preventDefault();
    targetPlayer.seekTo(course.lectures[lectureId].exercise_answer, true);
  }

  const handleClick = (lecture_number) => {
    setLectureId(lectureId => lecture_number);
    if (lecture_number == course.lectures.length - 1) {
      setLastLecture(isLastLecture => 1);
      setFirstLecture(isFirstLecture => 0)

    } else if (lecture_number == 0) {
      setLastLecture(isLastLecture => 0);
      setFirstLecture(isFirstLecture => 1)

    } else {
      setLastLecture(isLastLecture => 0);
      setFirstLecture(isFirstLecture => 0)
    }
  }

  const nextLecture = () => {
    setLectureId(lectureId => lectureId + 1);

    if (lectureId + 1 == course.lectures.length - 1) {
      setLastLecture(isLastLecture => 1);
      //console.log('1');
    }
    else {
      setLastLecture(isLastLecture => 0);
      setFirstLecture(isFirstLecture => 0);
      //console.log('-1');
    }
    console.log(lectureId);
  }

  const prevLecture = () => {
    setLectureId(lectureId => lectureId - 1);
    if (lectureId - 1 == 0) {
      setFirstLecture(isFirstLecture => 1);
      //console.log('1');
    }
    else {
      setFirstLecture(isFirstLecture => 0);
      setLastLecture(isLastLecture => 0);
      //console.log('1');
    }
    console.log(lectureId);
  }

  const disqusShortname = "voluntain-skku"
  const disqusConfig = {
    url: "https://localhost:3000/course",
    identifier: course.lectures[lectureId].id, // Single post id
    title: course.lectures[lectureId].title // Single post title
  }

  /**
   * 유튜브 API에서 비디오 종료가 감지될 경우 시행되며,
   * cookies.videoEnd 값을 1로 설정합니다.
   * 
   * @require Youtube object의 onEnd prop으로서 주어져야 합니다.
   */
  const handleVideoEnd = () => {
    if (cookies.noCookie === undefined)
      setCookie('videoEnd', 1, { path: '/', maxAge: 31536000 });
  }

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
      setCookie('courseId', course.id, { path: '/', maxAge: 31536000 });
      setCookie('lectureId', lectureId, { path: '/', maxAge: 31536000 });
      setCookie('videoEnd', 0, { path: '/', maxAge: 31536000 });
      setCookie('isLastLecture', isLastLecture, { path: '/', maxAge: 31536000 });
    }
  }

  /**
   * State values to style the sidebar.
   * @see https://material-ui.com/styles/basics/
   */
  const useStyles = makeStyles({
    default: {
      height: 48,
      '&$selected': {
        backgroundColor: '#00A553',
        "&:hover": {
          backgroundColor: "#00A553",
        },
      },
    },
    selected: {},
  });
  const classes = useStyles();

  /**
   * 현재 코스의 강의 목록을 백엔드에서 받아온 후,
   * 사용자가 각 강의로 이동할 수 있도록 lectureId를 조작하는 버튼을 사이드바에
   * 배치합니다.
   * @see https://material-ui.com/components/lists
   * @see https://material-ui.com/api/collapse
   */
  const sidebar = () => (
    <aside className={styles.lectureSidebar}>
      <ListItem onClick={responsivesidebar} style={{ height: 60 }}>
        <ListItemText primary={course.title} />
        {openSidebar ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openSidebar} timeout="auto" unmountOnExit>
        <div className={styles.lectureSidebarComponent}>
          {course.lectures.map((element, index) => {
            return (
              <List disablePadding>
                <ListItem button classes={{ root: classes.default, selected: classes.selected }} selected={index == lectureId} onClick={() => { handleClick(element.lecture_number); console.log(`index: ${index}, lectureId: ${lectureId}, ${index == lectureId}`); }}>
                  <ListItemText primary={element.title} style={{ marginLeft: '20px' }} />
                </ListItem>
              </List>
            )
          })}
        </div>
      </Collapse>
    </aside>
  );

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
      setLastLecture(cookies.lectureId == course.lectures.length - 1 ? 1 : 0);
    }
    setOpenSidebar(true);
  }, []);

  /**
   * 브라우저 너비가 작을 때 표시되는 Drawer를 조작하는 상태값입니다.
   * @see https://material-ui.com/components/drawers
   * @see https://material-ui.com/components/hidden
   */
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{course.lectures[lectureId].title} - Voluntain</title>
      </Head>

      <div className="HEADER">
        <NavigationBar titles={titles} />
      </div>

      <main className={styles.lecturePage}>
        {/* 페이지 너비가 960px 이하일 경우, 사이드바를 숨깁니다. */}
        <Hidden smDown>
          {sidebar()}
        </Hidden>

        {/* 대신 Drawer 형태로 임시 사이드바를 사용합니다. */}
        <Drawer open={openDrawer} onClose={toggleDrawer}>
          {sidebar()}
        </Drawer>

        <div className={styles.lectureContent}>
          <h1 className={styles.lectureTitle}>{course.lectures[lectureId].title}</h1>
          <p className={styles.lectureDate}>{course.lectures[lectureId].uploaded_date}</p>
          <hr />
          <div>
            <Youtube videoId={course.lectures[lectureId].video_link} opts={opts} onPlay={handleVideoStart} onEnd={handleVideoEnd} onReady={onPlayerReady} />
          </div>
          <hr />
          <div>
            <Button variant="contained" color="primary" disabled={isFirstLecture} onClick={prevLecture}>{'< Prev'}</Button>
            {' '}
            <Button variant="contained" color="primary" disabled={isLastLecture} onClick={nextLecture}>{'Next >'}</Button>
          </div>

          <div className={styles.lectureCardContainer}>
            <div className={styles.lectureCardsRow}>
              <LectureCards
                title='Lecture Info'
                content={course.lectures[lectureId].about}
              />
            </div>
            <div className={styles.lectureCardsRow}>
              <LectureCards
                title='Exercise'
                content={course.lectures[lectureId].exercise_question}
              />
            </div>
            <Button variant="contained" color="primary" onClick={toExercise}>Check Answer</Button>

          </div>

          <div style={{ width: '100%' }}>
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </div>
        </div>
      </main>

      {/* 페이지 너비가 960px 이하인 경우, 임시 사이드바를 열 수 있는 버튼을 보여줍니다. */}
      <Hidden mdUp>
        <Fab color="primary" style={{ position: 'sticky', bottom: 10, left: 10 }}>
          <ListIcon onClick={toggleDrawer} />
        </Fab>
      </Hidden>
    </div>
  )
};


// {url}/courses/id 에 GET Request 보내 courses 정보 받아오기
export const getStaticProps = async (context) => {
  const data = await fetch(`${url}/courses/${context.params.id}`);
  const course = await data.json();

  const data0 = await fetch(`${url}/courses/title`);
  const titles = await data0.json();

  return {
    props: { course, titles },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  const res = await fetch(`${url}/courses`);
  const courses = await res.json();

  const paths = courses.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return { paths, fallback: false };
};

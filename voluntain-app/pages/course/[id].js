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

export default function LecturePage({ course, titles }) {
  /**
   * States to handle cookies.
   * @see https://www.npmjs.com/package/react-cookie
   */
  const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);

  //for exercise link
  const [targetPlayer, setTargetPlayer] = useState({});

  /**
   * Initializing state values.
   * lectureId value determines which lecture is displayed in the currently 
   *     accessed course URL. The starting value is 0.
   * When isFirstLecture is 1 (true), the prev lecture button is disabled.
   * When isLastLecture is 1 (true), the next lecture button is disabled.
   */
  const [lectureId, setLectureId] = useState(0);
  const [isFirstLecture, setFirstLecture] = useState(1);
  const [isLastLecture, setLastLecture] = useState(course.lectures.length == 1 ? 1 : 0);

  /**
   * State to change the size of the video player to fit the screen size.
   * @requires ../components/useWindowSize.js
   */
  const size = useWindowSize();

  /**
   * Option values to pass to Youtube API.
   * To give sufficient margin, the height and width values should be slightly 
   *     smaller than the current screen size (i.e. size.height)
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
   * State to control the sidebar.
   * Initially the sidebar is closed, and after rendering the page,
   * React.useEffect will open the sidebar.
   * There is a rendering issue if sidebar is open initially.
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
   * When video termination is detected by the Youtube API,
   * this sets a corresponding cookie:
   * - cookies.videoEnd to 1
   * 
   * This must be given as the onEnd prop of the Youtube object.
   */
  const handleVideoEnd = () => {
    if (cookies.noCookie === undefined)
      setCookie('videoEnd', 1, { path: '/', maxAge: 31536000 });
  }

  /**
   * When video start is detected by Youtube API,
   * this sets the relevant cookie values.
   * - cookies.courseId to the current course id.
   * - cookies.lectureId to the current lecture id.
   * - cookies.videoEnd to 0.
   * - cookies.isLastLecture to the current isLastLecture value.
   * 
   * This must be given as the onPlay prop of the Youtube object.
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
   * Get the list of lectures in the current course from the backend,
   * and create buttons that change lectureId value so that users can move
   * to that lecture.
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
   * Using React.useEffect, re-set the previously initialized cookie values
   * only once after page rendering (if there is video history).
   * And also open the sidebar.
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
   * State to control the drawer, that appears when screen width is small enough.
   * @see https://material-ui.com/components/drawers
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
        <Hidden smDown>
          {sidebar()}
        </Hidden>

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

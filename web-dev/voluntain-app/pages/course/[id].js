import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { url } from "../../config/next.config";

import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie'
import { DiscussionEmbed } from "disqus-react"

import { Button, Collapse, Drawer, Fab, List, ListItem, ListItemText, Hidden } from '@material-ui/core'

// import { VideoPlayer } from '../../components/VideoPlayer'
// import VideoPlayer from '../../components/VideoPlayer'
import Youtube from 'react-youtube'
import { useWindowSize } from './useWindowSize';


import { NavigationBar } from '../../components/NavigationBar'
import { LectureCards } from '../../components/LectureCards'
import { Footer } from '../../components/Footer';
import styles from '../../styles/Home.module.css'

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/List';

export default function LecturePage({ course, titles }) {
  const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);
  
  //for exercise link
  const [targetPlayer, setTargetPlayer] = useState({});
  
  // lectureId start from 0
  const [lectureId, setLectureId] = useState(0);
  const [isFirstLecture, setFirstLecture] = useState(1); // True
  const [isLastLecture, setLastLecture] = useState(0); // False

  //exercise 변수
  const size = useWindowSize();

    const opts = {
      height: size.height > 650 ? '600' : size.height - 50,
      width: size.width > 1050 ? '900' : size.width - 250,
      playerVars: {
        // To check other variables, check:
        // https://developers.google.com/youtube/player_parameters
        cc_load_policy: 1,
        modestbranding: 1,
      }
    }

  function renderRow(props) {
    const { index, style } = props;

    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={`Lecture ${index + 1}`} />
      </ListItem>
    );
  }

  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  const [open, setOpen] = React.useState(false);
  const responsivesidebar = () => {
    setOpen(!open)
  };

  

  //exercise 관련 함수
  const onPlayerReady = (event) => {
    
    setTargetPlayer(targetPlayer => event.target);
    // var targetPlayer;
    // targetPlayer= event.target;
  }

  const toExercise = () => {
    targetPlayer.seekTo(course.lectures[lectureId].exercise_answer, false);
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

  //const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);
  const handleVideoEnd = () => {
    if (cookies.noCookie === undefined)
      setCookie('videoEnd', 1, { path: '/', maxAge: 31536000 });
  }
  const handleVideoStart = () => {
    if (cookies.noCookie == undefined) {
      setCookie('courseId', 1, { path: '/', maxAge: 31536000 });
      setCookie('lectureId', 0, { path: '/', maxAge: 31536000 });
      setCookie('videoEnd', 0, { path: '/', maxAge: 31536000 });
    }
  }

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

  const sidebar = () => (
    <aside className={styles.lectureSidebar}>
      <ListItem onClick={responsivesidebar} style={{ height: 60 }}>
        <ListItemText primary={course.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="LeftSide" style={{ float: 'left' }}>
          {course.lectures.map((element, index) => {
            return (
              <List disablePadding>
                <ListItem button classes={{ root: classes.default, selected: classes.selected }} selected={index == lectureId} onClick={() => { handleClick(element.lecture_number - 1); console.log(`index: ${index}, lectureId: ${lectureId}, ${index == lectureId}`); }}>
                  <ListItemText primary={element.title} style={{ marginLeft: '20px' }} />
                </ListItem>
              </List>
            )
          })}
        </div>
      </Collapse>
    </aside>
  );

  useEffect(() => {
    if (cookies.lectureId !== undefined) {
      setLectureId(cookies.lectureId);
    }
    setOpen(true);
  }, []);

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
            {/* <VideoPlayer videoId={course.lectures[lectureId].video_link} startChecker={handleVideoStart} endChecker={handleVideoEnd} /> */}

            <Youtube videoId={course.lectures[lectureId].video_link} opts={opts} onPlay={handleVideoStart} onEnd={handleVideoEnd} onReady={onPlayerReady}/>
            <button onClick= {toExercise}>click me</button>
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

      <footer className={styles.lectureFooter}>
        <Footer />
      </footer>

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

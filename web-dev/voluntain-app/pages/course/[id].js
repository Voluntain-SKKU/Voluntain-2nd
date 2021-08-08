import React, { useState, useEffect } from 'react'
import { url } from "../../config/next.config";

import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie'
import { FixedSizeList } from 'react-window';
import { DiscussionEmbed } from "disqus-react"

import { Button, Collapse, Divider, Fab, Hidden, List, ListItem, ListItemIcon, ListItemText, ListSubheader, TextField } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List'

import { VideoPlayer } from '../../components/VideoPlayer'
import { NavigationBar } from '../../components/NavigationBar'
import { Comment } from '../../components/Comment'
import { SideBar } from '../../components/SideBar'
import { LectureCards } from '../../components/LectureCards'
import { Footer } from '../../components/Footer';
import styles from '../../styles/Home.module.css'

import SendIcon from '@material-ui/icons/Send';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import grey from '@material-ui/core/colors/grey';

/**
 * This function is executed when the floating-button that appears when page
 * width is small is clicked.
 * This does nothing now, but might be replaced with another function.
 */
function nop() { }

export default function LecturePage({ course, titles }) {
  const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);

  // lectureId start from 0
  const [lectureId, setLectureId] = useState(0);
  const [isFirstLecture, setFirstLecture] = useState(1); // True
  const [isLastLecture, setLastLecture] = useState(0); // False

  useEffect(() => { 
    if(cookies.lectureId !== undefined){ 
      setLectureId(cookies.lectureId); 
    } 
  },[]);

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

  const [open, setOpen] = React.useState(true);
  const responsivesidebar = () => {
    setOpen(!open)
  };

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
      setCookie('lectureId', 1, { path: '/', maxAge: 31536000 });
      setCookie('videoEnd', 0, { path: '/', maxAge: 31536000 });
    }
  }

  return (
    <div className={styles.container}>
      <NavigationBar titles={titles} />

      <div className="Left" style={{float : 'left'}}>
          <ListItem onClick={responsivesidebar} style={{background : '#003458', height: 48, color:grey[50]}}>
            <StarBorder style={{color:grey[50]}}/>
            <ListItemText primary={course.title}/>
            {open? <ExpandLess/> : <ExpandMore/>}
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="LeftSide" style={{ float: 'left' }}>
            {course.lectures.map((element) => {
                return (
                  <List disablePadding>
                    <ListItem button onClick={(e) => handleClick(element.lecture_number, e)} style={{background : '#003458', height: 48, color:grey[50]}}>
                      <ListItemIcon>
                        <StarBorder style={{color:grey[50]}}/>
                      </ListItemIcon>
                      <ListItemText primary={element.title} />
                      </ListItem>
                  </List>
                )
              })}
            </div>
          </Collapse>
      </div>

      <main className={styles.main}>
        <div>
          <h1>{course.lectures[lectureId].title}</h1>
        </div>

        <div>
          <Button variant="contained" color="primary" disabled={isFirstLecture} onClick={prevLecture}>{'< Prev'}</Button>
          {' '}
          <Button variant="contained" color="primary" disabled={isLastLecture} onClick={nextLecture}>{'Next >'}</Button>
        </div>

        <Divider style={{ margin: 10, width: '70%', background: '#ffffff', borderTop: 'thin solid black' }} />

        <div style={{ border: 'solid', borderWidth: 'thin' }}>
          <VideoPlayer videoId={course.lectures[lectureId].video_link} startChecker={handleVideoStart} endChecker={handleVideoEnd} />
        </div>

        <Divider style={{ margin: 10, width: '70%', background: '#ffffff', borderTop: 'thin solid black' }} />

        <LectureCards title="Lecture Info" content={course.lectures[lectureId].title} />

        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 900, alignItems: 'center', justifyContent: 'center' }}>
          <LectureCards title="Exercise" content={course.lectures[lectureId].title} />  
          <LectureCards title="Answer" content={course.lectures[lectureId].title} />
        </div>

        {/* <div style={{ outline: 'thin solid black' }}>
          <Comment />
        </div> */}

        <div style={{ width: 900, height: 90, alignItems: 'center' }}>
          <DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>
      </main>
      <Hidden smUp>
        <Fab color="primary" style={{ position: 'sticky', bottom: 10, left: 10 }}>
          <ListIcon onClick={nop} />
        </Fab>
      </Hidden>
      <Footer />
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

  const paths = courses.map((item)=> ({
      params: { id: item.id.toString() },
  }));

  return { paths, fallback: false };
};

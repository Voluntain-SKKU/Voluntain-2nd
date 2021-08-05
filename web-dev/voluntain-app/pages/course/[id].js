import React from 'react'
import { Button, Divider, Fab, Hidden, TextField } from '@material-ui/core'
import { url } from "../../config/next.config";
import { useRouter } from 'next/router';

import React, { useState, useEffect } from 'react'
import { Button, Card, CardContent, Divider, Fab, Hidden, Link, Typography } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List';
import { useCookies } from 'react-cookie'

import { VideoPlayer } from '../../components/VideoPlayer'
import { NavigationBar } from '../../components/NavigationBar'
import { Comment } from '../../components/Comment'
import { SideBar } from '../../components/SideBar'
import { LectureCards } from '../../components/LectureCards'
import styles from '../../styles/Home.module.css'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import ListSubheader from '@material-ui/core/ListSubheader';
import SendIcon from '@material-ui/icons/Send';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
/**import { List } from 'react-bootstrap/lib/Media';*/
import grey from '@material-ui/core/colors/grey';

import List from '@material-ui/core/List';

import {DiscussionEmbed} from "disqus-react"
// import { CommentEmbed } from 'disqus-react';
/**
 * This function is executed when the floating-button that appears when page
 * width is small is clicked.
 * This does nothing now, but might be replaced with another function.
 */
function nop() { }

/**
 * @requires (from backend)
 * 1. lectureList
 * 2. isFirstLecture
 * 3. isLastLecture
 * 4. Lecture Title
 * 5. videoId
 * 6. the upper LectureCard title / contents
 * 7. the lower LectureCard title / contents
 * 
 * @variation
 * 1. Add or remove Dividers
 * 2. Modify style around Cards
 */


export default function LecturePage({ course }) {
  const router = useRouter()
  const lecture_id = router.query.lectureId;

  //console.log(router.query);
  //console.log(router.query.lectureId);

  // lectureId start from 0
  const [lectureId, setLectureId] = useState(0);
  const [isFirstLecture, setFirstLecture] = useState(1); // True
  const [isLastLecture, setLastLecture] = useState(0); // False
  
  /**
   * These check whether the current lecture is the first or last one.
   * If it is, disable Prev or Next button.
   */

  const useStyles = makeStyles((prop) => ({
    root: {
        width: '100%',
        height: prop.height,
        maxWidth: prop.width,
        backgroundColor: '#003458',
        color: 'white'
    },
    nested:{
        paddingLeft: prop.spacing(4),
    }
}));

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
  setLectureId(lectureId => lectureId+1);
  
  if(lectureId+1 == course.lectures.length-1) {
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
  setLectureId(lectureId => lectureId-1);
  if(lectureId-1 == 0) {
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
   * Temporary cookie example
   */
  const [cookies, setCookie] = useCookies(['username', 'video']);
  const [username, setUsername] = React.useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    /**
     * Set a cookie named 'name-cookie' with the value 'name',
     * that is accessible on all pages,
     * and its max age is 10 sec.
     */
    setCookie('username', event.target.value, { path: '/', maxAge: 30 });
    
  }

  /**
   * Video state example
   */
  const [videoEnd, setVideoEnd] = React.useState("Not yet watched");
  const handleVideoEnd = () => {
    /**
     * NOTE: An error occurs when directly passing a string as a prop
     * instead of using 'str'
     */
    let str = "watched"
    setVideoEnd(str);
    setCookie('username', str, { path: '/', maxAge: 30 });
  }

  return (
    <div className={styles.container}>
      <NavigationBar />
      
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
        <TextField value={username} onChange={handleUsernameChange} />
        <h3>Hello, {username}! {videoEnd}</h3>
        <h3>Welcome Back, {cookies.username}! {cookies.video}</h3>

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
<<<<<<< HEAD
          <VideoPlayer videoId='_9RvpFdUQr0' endChecker={handleVideoEnd} />
=======
          <VideoPlayer videoId={course.lectures[lectureId].video_link} />
>>>>>>> 10d58b1369f06c72ae55ab6cc8398b64f65b8537
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

        <div style={{width : 900, height : 90, alignItems: 'center'}}>
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
    </div>
  )
}

// {url}/courses/id?lecture_id 에 GET Request 보내 courses 정보 받아오기
export const getStaticProps = async (context) => {
  const data = await fetch(`${url}/courses/${context.params.id}`);
  const course = await data.json();

  return {
      props: { course },
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

// LecturePage.getInitialProps = async (context) => {
//   const lectureId = context.query.lectureId;
//   console.log(lectureId);
//   console.log(context.query.id);
//   // const data = await fetch(`${url}/courses/${context.params.id}`);
//   const data = await fetch(`${url}/courses/${context.query.id}`);
//   const course = await data.json();

//   return {
//       props: { course, lectureId },
//       revalidate: 1,
//   };
// };
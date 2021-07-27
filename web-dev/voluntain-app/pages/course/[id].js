import { url } from "../../config/next.config";

import React from 'react'
import { Button, Card, CardContent, Divider, Fab, Hidden, Link, Typography } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List';

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

  let lecture_id = 1;
  /**
   * This composes the content of the sidebar.
   */
  const lectureList = [
    'About Scratch',
    'Easy',
    'Hard',
  ];

  const lowerCardContent = [
    { 'title': 'Contents', 'content':  course.lectures[lecture_id-1].title},
    { 'title': 'See Also', 'content':  course.lectures[lecture_id-1].video_link},
  ]

  /**
   * These check whether the current lecture is the first or last one.
   * If it is, disable Prev or Next button.
   */
  const isFirstLecture = true;
  const isLastLecture = false;

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

const handleClick = (id) => {
  lecture_id = id
};

const nextLecture = () => {
  lecture_id += 1
}

const prevLecture = () => {
  lecture_id -= 1
}


  return (
    <div className={styles.container}>
      <NavigationBar />

      <div className="LeftSide" style={{ float: 'left' }}>
          {course.lectures.map((element) => {
            return (
              <List>
                <List>
                  <ListItem button onClick={handleClick(element.id)} style={{background : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', height: 48, color:grey[50]}}>
                    <ListItemText primary={element.title} />
                  </ListItem>
                </List>
              </List>
            )
          })}
        </div>

      <main className={styles.main}>
        <div>
          <h1>{course.lectures[lecture_id-1].title}</h1>
        </div>

        <div>
          <Button variant="contained" color="primary" disabled={isFirstLecture} onClick={nextLecture}>{'< Prev'}</Button>
          {' '}
          <Button variant="contained" color="primary" disabled={isLastLecture} onClick={prevLecture}>{'Next >'}</Button>
        </div>

        <Divider style={{ margin: 10, width: '70%', background: '#ffffff', borderTop: 'thin solid black' }} />

        <div style={{ border: 'solid', borderWidth: 'thin' }}>
          <VideoPlayer videoId={course.lectures[0].video_link} />
        </div>

        <Divider style={{ margin: 10, width: '70%', background: '#ffffff', borderTop: 'thin solid black' }} />

        <LectureCards title="Lecture Info" content="Created on July 22." />

        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 900, alignItems: 'center', justifyContent: 'center' }}>
          {lowerCardContent.map((element) => {
            return <LectureCards title={element.title} content={element.content}/>
          })}
        </div>

        <div style={{ outline: 'thin solid black' }}>
          <Comment />
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

// {url}/courses/id 에 GET Request 보내 courses 정보 받아오기
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

import React from 'react'
<<<<<<< HEAD
import Button from 'react-bootstrap/Button'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden';
import { useCookies } from 'react-cookie'
=======
import ReactDom from 'react-dom'
import Demo from '../components/SideBar'
import Button from 'react-bootstrap/Button'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden';
import styles from '../styles/Home.module.css';
>>>>>>> 10d58b1369f06c72ae55ab6cc8398b64f65b8537

import { VideoPlayer } from '../components/VideoPlayer'
import { NavigationBar } from '../components/NavigationBar'
import { Comment } from '../components/Comment'
import { LectureText } from '../components/LectureText'
import { SideBar } from '../components/SideBar'
<<<<<<< HEAD

export default function Page() {
  const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie']);
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
    <div>
      <div className="Body">
        <h3>courseId: {cookies.courseId} // lectureID: {cookies.lectureId} // videoEnd: {cookies.videoEnd}</h3>

        <div className="RightSide" style={{ float: 'left', margin: 10 }}>
          <div className="LectureTitle" style={{ margin: 10 }}>
            <h1>Lecture 1</h1>
          </div>

          <div className="Buttons" style={{ marginBottom: 70 }}>
            <div style={{ float: 'left' }}><Button variant="light">{'< Prev'}</Button></div>

            <div style={{ float: 'right' }}><Button variant="dark">{'Next >'}</Button></div>
          </div>

          <div className="Player" style={{ clear: 'both' }}>
            <VideoPlayer videoId='_9RvpFdUQr0' startChecker={handleVideoStart} endChecker={handleVideoEnd} />
          </div>

          <div>
            <LectureText
              title="This course is ..."
              content="for beginners. Try it!"
            />
            <Divider style={{ background: 'black' }} variant='middle' />
            <LectureText
              title="Exercise "
              content="Do this exercise!"
            />
          </div>

          <div className="Comment">
            <Comment />
          </div>
        </div>
      </div>
    </div>
=======
import { LectureCards } from '../components/LectureCards'

export default function Page() {

  const isFirstLecture = true;
  const isLastLecture = false;
  
  const lowerCardContent = [
    { 'title': 'Contents', 'content': "- About Scratch (0:00) \n- Exercises (2:00)" },
    { 'title': 'See Also', 'content': "https://google.com \nhttps://bing.com" },
  ]

  return (
    <div>
      <div className="Head">
        <NavigationBar />
      </div>

      <div className="Body">
        <div className="LeftSide" style={{ float: 'left' }}>
          <Hidden smDown>
            <SideBar height={1000} width={200} />
          </Hidden>
        </div>
      </div>

      <main className={styles.main}>
        <div>
          <h1>About Scratch</h1>
        </div>

        <div>
          <Button variant="contained" color="primary" disabled={isFirstLecture}>{'< Prev'}</Button>
          {' '}
          <Button variant="contained" color="primary" disabled={isLastLecture}>{'Next >'}</Button>
        </div>

        <Divider style={{ margin: 10, width: '70%', background: '#ffffff', borderTop: 'thin solid black' }} />

        <div style={{ border: 'solid', borderWidth: 'thin' }}>
          <VideoPlayer videoId='_9RvpFdUQr0' />
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
  </div>

    
>>>>>>> 10d58b1369f06c72ae55ab6cc8398b64f65b8537
  )
}

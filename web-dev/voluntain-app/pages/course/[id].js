import React from 'react'
import { Button, Card, CardContent, Divider, Hidden, Link, Typography } from '@material-ui/core'
import styles from '../../styles/Home.module.css'

import { VideoPlayer } from '../../components/VideoPlayer'
import { NavigationBar } from '../../components/NavigationBar'
import { Comment } from '../../components/Comment'
import { LectureText } from '../../components/LectureText'
import { SideBar } from '../../components/SideBar'

export default function LecturePage() {
  /**
   * This composes the content of the sidebar.
   */
  const lectureList = [
    'About Scratch',
    'Easy',
    'Hard',
  ];

  /**
   * These check whether the current lecture is the first or last one.
   * If it is, disable Prev or Next button.
   */
  const firstLecture = true;
  const lastLecture = false;

  return (
    <div className={styles.container}>
      <NavigationBar />

      <main className={styles.main}>
        <div>
          <h1>About Scratch</h1>
        </div>

        <div>
          <Button variant="contained" color="primary" disabled={firstLecture}>{'< Prev'}</Button>
          {' '}
          <Button variant="contained" color="primary" disabled={lastLecture}>{'Next >'}</Button>
        </div>

        <Divider style={{ margin: 10, width: '70%', background: '#ffffff', borderTop: 'thin solid black' }} />

        <div style={{ border: 'solid', borderWidth: 'thin' }}>
          <VideoPlayer videoId='_9RvpFdUQr0' />
        </div>

        <Divider style={{ margin: 10, width: '70%', background: '#ffffff', borderTop: 'thin solid black' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <Card style={{ margin: 10 }}>
            <CardContent>
              <Typography variant="h5" color="textPrimary" gutterBottom>Lecture Info</Typography>
              <Typography variant="h6" color="textSecondary">Created On July 22.</Typography>
            </CardContent>
          </Card>

          <Card style={{ margin: 10 }}>
            <CardContent>
              <Typography variant="h5" color="textPrimary" gutterBottom>Source Code</Typography>
              <Typography variant="h6" color="textSecondary">
                Click {' '}
                <Link href="../../">here.</Link>
              </Typography>
            </CardContent>
          </Card>

          <Card style={{ margin: 10 }}>
            <CardContent>
              <Typography variant="h5" color="textPrimary" gutterBottom>Another</Typography>
              <Typography variant="h6" color="textSecondary">
                This is very looooooooooooooooooooooooooooooooong.
              </Typography>
            </CardContent>
          </Card>


          <Card style={{ margin: 10 }}>
            <CardContent>
              <Typography variant="h5" color="textPrimary" gutterBottom>Content</Typography>
              <Typography variant="h6" color="textSecondary">
                - About Scractch (0:00) <br />
                - Exercises (2:00)
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div style={{ outline: 'thin solid black' }}>
          <Comment />
        </div>
      </main>

    </div>
  )
}

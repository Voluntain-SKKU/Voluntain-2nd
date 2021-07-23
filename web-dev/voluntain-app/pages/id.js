import React from 'react'
import ReactDom from 'react-dom'
import Demo from '../components/SideBar'
import Button from 'react-bootstrap/Button'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden';
import styles from '../styles/Home.module.css';

import { VideoPlayer } from '../components/VideoPlayer'
import { NavigationBar } from '../components/NavigationBar'
import { Comment } from '../components/Comment'
import { LectureText } from '../components/LectureText'
import { SideBar } from '../components/SideBar'


export default function Page() {
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
    </main>
    </div>

    
  )
}

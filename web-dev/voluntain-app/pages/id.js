import Disqus from 'disqus-react'
import React from 'react'
import Button from 'react-bootstrap/Button'

import { VideoPlayer } from '../components/VideoPlayer'
import { NavigationBar } from '../components/NavigationBar'
import { Comment } from '../components/Comment'
import { LectureText } from '../components/LectureText'

export default function Page() {
  return (
    <div>
      <div className="NavigationBar">
        <NavigationBar />
      </div>

      <div className="PrevButton" style={{ float: 'left' }}>
        <Button variant="light">Prev</Button>
      </div>

      <div className="Title" style={{ float: 'left' }}>
        <h1>Scratch - Lecture 1</h1>
      </div>

      <div className="NextButton" style={{ float: 'left' }}>
        <Button variant="dark">Next</Button>
      </div>

      <div className="Player" style={{ clear: 'both' }}>
        <VideoPlayer videoId='_9RvpFdUQr0' />
      </div>

      <div>
        <LectureText 
          title="This course is ..." 
          content="for beginners. Try it!"
        />
        <LectureText 
          title="Exercise " 
          content="Do this exercise!"
        />
      </div>

      <div className="Comment">
        <Comment />
      </div>
    </div>
  )
}

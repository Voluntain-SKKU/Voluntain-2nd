import Disqus from 'disqus-react'
import React from 'react'
import Button from 'react-bootstrap/Button'

import { VideoPlayer } from '../components/VideoPlayer'
import { Navbar } from '../components/Navbar'
import { Comment } from '../components/Comment'

export default function Page() {
  return (
    <div>
      <div className="NavigationBar">
        <Navbar />
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

      <div className="Comment">
        <Comment />
      </div>
    </div>
  )
}

import { Navbar } from '../components/Navbar'
import Disqus from 'disqus-react'
import React from 'react'
import Youtube from 'react-youtube'
import Button from 'react-bootstrap/Button'

// _9RvpFdUQr0
class YoutubePlayer extends React.Component {
  videoOnReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    // console.log(event.target);
  }

  render() {
    const opts = {
      height: '480',
      width: '720',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      }
    }

    const { videoId } = this.props

    return <Youtube videoId={videoId} opts={opts} onReady={this.videoOnReady} />;
  }
}

export default function Page() {
  const disqusShortname = "voluntain-test";
  const disqusConfig = {
    url: "localhost:3000/id",
  }

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

      <div className="VideoPlayer" style={{ clear: 'both' }}>
        <YoutubePlayer videoId='_9RvpFdUQr0' />
      </div>

      <div className="Comment">
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    </div>
  )
}

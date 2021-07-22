import React from 'react'
import Youtube from 'react-youtube'

/**
 * @Usage
 *     \<VideoPlayer videoId='_9RvpFdUQr0' \/\>
 */
export const VideoPlayer = (props) => {
    return (
        <YoutubePlayer videoId={props.videoId}/>
    );
}

/**
 * @see
 * https://developers.google.com/youtube/iframe_api_reference
 */
class YoutubePlayer extends React.Component {
    render() {
      const opts = {
        height: '480',
        width: '720',
        playerVars: {
          // To check other variables, check:
          // https://developers.google.com/youtube/player_parameters
          cc_load_policy: 1,
          modestbranding: 1,
        }
      }
  
      const { videoId } = this.props
  
      return <Youtube videoId={videoId} opts={opts} />;
    }
  }

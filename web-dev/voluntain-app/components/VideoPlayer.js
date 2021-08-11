// import React from 'react'
import Youtube from 'react-youtube'
import { useWindowSize } from './useWindowSize';
import React, { useState } from 'react'
const [targetPlayer, setTargetPlayer] = useState(0);

/**
 * @see
 * https://developers.google.com/youtube/iframe_api_reference
 * https://developers.google.com/youtube/player_parameters
 * 
 * @usage
 *     \<VideoPlayer videoId='_9RvpFdUQr0' startChecker={} endChecker={} \/\>
 * 
 * @note
 * When a video starts, the method given to startChecker is called.
 * When a video ends, the method given to endChecker is called.
 */
// export const VideoPlayer = (props) => {
//   const size = useWindowSize();

//     const opts = {
//       height: size.height > 650 ? '600' : size.height - 50,
//       width: size.width > 1050 ? '900' : size.width - 250,
//       playerVars: {
//         // To check other variables, check:
//         // https://developers.google.com/youtube/player_parameters
//         cc_load_policy: 1,
//         modestbranding: 1,
//       }
//     }

//   const { videoId } = props;

//   return (
//       <Youtube videoId={videoId} opts={opts} onPlay={props.startChecker} onEnd={props.endChecker} />
//   );
// }

// var targetPlayer;

class VideoPlayer extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     player: {},
  //   }

  //   this.onPlayerReady = this.onPlayerReady.bind(this);
  // }

  onPlayerReady(event) {
    setTargetPlayer = ({
      targetPlayer: event.target,
    });
    // var targetPlayer;
    // targetPlayer= event.target;
  }

  toExercise() {
    targetPlayer.seekTo(30, false);
  }



  render() {
    const opts = {
      height: '600',
      width: '900',
      playerVars: {
        cc_load_policy: 1,
        modestbranding: 1,
      }
    }

    return (
      <div>
        <Youtube videoId={this.props.videoId} opts={opts} onPlay={this.props.startChecker} onEnd={this.props.endChecker} onPause={this.onPlayerReady}/>
        <button onClick= {this.toExercise}>click me</button>
      </div>
    );
  }

}


export default VideoPlayer;
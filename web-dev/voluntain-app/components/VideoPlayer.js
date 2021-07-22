import React from 'react'
import Youtube from 'react-youtube'
import { useWindowSize } from './useWindowSize';

/**
 * @see
 * https://developers.google.com/youtube/iframe_api_reference
 * https://developers.google.com/youtube/player_parameters
 * 
 * @Usage
 *     \<VideoPlayer videoId='_9RvpFdUQr0' \/\>
 */
export const VideoPlayer = (props) => {
    const size = useWindowSize();

    const opts = {
      height: size.height > 480? '480' : size.height,
      width: size.width > 720 ? '720' : size.width,
      playerVars: {
        // To check other variables, check:
        // https://developers.google.com/youtube/player_parameters
        cc_load_policy: 1,
        modestbranding: 1,
      }
    }

    const { videoId } = props

    return (
      <Youtube videoId={videoId} opts={opts} />
    );
}

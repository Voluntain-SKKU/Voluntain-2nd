import React from 'react'
import Disqus from 'disqus-react'

/**
 * @usage
 *     \<Comment \/\>
 */
export const Comment = () => {
    const disqusShortname = "voluntain-test";

    /**
     * The URL of webpage should first be added to Disqus account,
     * then change config below.
     */
    const disqusConfig = {
      url: "localhost:3000/id",
    }

    return (
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
    );
}

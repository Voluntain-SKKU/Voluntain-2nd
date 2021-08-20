import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Typography from '@material-ui/core/Typography';
import { url } from '../config/next.config' //url 가져오기

import { Divider } from '@material-ui/core'
import { MainBanner } from '../components/MainBanner'
import { DiscussionEmbed } from "disqus-react"

export default function Page({ titles }) {
  const disqusShortname = "skku-voluntain"
  const disqusConfig = {
    url: "https://localhost:3000/question",
    //identifier: course.lectures[lectureId].id, // Single post id
    title: "Question for everything" // Single post title
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>QnA - Voluntain</title>
      </Head>
      <MainBanner />
      <main className={styles.main}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary">
          Q&A
        </Typography>
        <Divider style={{ margin: 15, width: '5%', background: '#ffffff', borderTop: 'thin solid black' }} />
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          If you have any questions, feel free to ask!
        </Typography>

        <br></br>
        <div style={{ width: 900, alignItems: 'center' }}>
          <DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {

  // 이거 courses에서 뽑아오고 싶은데??
  const data0 = await fetch(`${url}/courses/title`);
  const titles = await data0.json();

  return {
    props: { titles },
    revalidate: 1,//몇 초로 할지?
  };
};

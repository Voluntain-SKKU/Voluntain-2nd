import React from 'react'
import Head from 'next/head'
import { MainBanner } from '../components/MainBanner'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styles from '../styles/Home.module.css'
import { url } from '../config/next.config' //url 가져오기


export default function Page( { titles }) {
  return (
    <div>
      <Head>
          <title>About Us - Voluntain</title>
      </Head>
      <div className="Head">
        <MainBanner />
      </div>
      <main>
        <div>
          <Paper className={styles.about}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                  <img className={styles.aboutimg} alt="complex" src="/logo_about.png" />
              </Grid>
              <Grid item xs={9} sm container>
                <Grid item xs container>
                  <Grid item xs>
                    <p className={styles.aboutfont2}>
                    Voluntain will share the knowledge of programming.
                    </p>
                    <br></br>
                    <p className={styles.aboutfont}>
                    You can take easy-to-understand lectures created by our team, including Scratch and Python. Also, improve your understanding and application skills of programming with exercise questions in the lecture videos.
                    </p>
                    <br></br>
                    <p className={styles.aboutfont2}>
                    Voluntain's website will give you a learning-friendly environment.
                    </p>
                    <br></br>
                    <p className={styles.aboutfont}>
                    Our website supports the following component.<br></br>
                    1. Various online lectures with detailed descriptions and exercise questions.<br></br>
                    2. Q&A section to ask questions freely.<br></br>
                    3. Function to check the lecture you watched recently.                    
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <div>
          <Paper className={styles.about}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                  <p className={styles.abouttitle}>
                    Vision
                  </p>
                  <br></br>
                  <p className={styles.aboutfont2}>
                  Voluntain pursues continuous learning.
                  </p>
                  <br></br>
                  <p className={styles.aboutfont}>
                  The existing ‘World Friends ICT SW Volunteers’ provides one-time training. However, due to the time limit, it becomes difficult to teach programming skills perfectly. Moreover, COVID-19 has been preventing the team from providing continuous learning. <br></br>
                  In this situation, our team realized the need for another way to provide continuous programming education and has come up with easily accessible online lectures. We hope that you can access SW classes without time and space constraints and achieve continuous learning.                  
                  </p>
                  <br></br>
                  <p className={styles.aboutfont2}>
                  Voluntain pursues open communication.
                  </p>
                  <br></br>
                  <p className={styles.aboutfont}>
                  Communication is a critical part of learning. You can use Q&A sections freely to communicate with volunteers and to solve questions. Open communication will reach your better studying and finally contribute to bridging the information gap between us.
                  </p>
                  <br></br>
                  <p className={styles.aboutfont2}>
                  Voluntain pursues cultural exchanges.
                  </p>
                  <br></br>
                  <p className={styles.aboutfont}>
                  Our team also hopes to share cultures by providing special culture clips. In this cultural exchange, you can become global person.
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div>
        <Paper className={styles.about}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <p className={styles.abouttitle}>
                    History
                  </p>
                  <br></br>
                  <p className={styles.aboutfont2}>
                  2020.11 Voluntain foundation
                  </p>
                  <br></br>
                  <p className={styles.aboutfont2}>
                  2021.06 1st Voluntain Community launched
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
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
    props: {  titles },
    revalidate: 1,//몇 초로 할지?
  };
};

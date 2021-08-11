import React from 'react'
import Head from 'next/head'
import { NavigationBar } from '../components/NavigationBar'
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
          <title>About Voluntain</title>
      </Head>
      <div className="Head">
        <NavigationBar titles={titles} />
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
                      Voluntain introduces and teaches programming easily for children and students abroad.
                    </p>
                    <br></br>
                    <p className={styles.aboutfont}>
                      We produce online lectures so that people can easily approach and understand programming. The lectures have topics such as Scratch and Python. We also provide practice questions to help students apply their understanding.
                    </p>
                    <br></br>
                    <p className={styles.aboutfont2}>
                    Voluntain will make your learning easier by the website.
                    </p>
                    <br></br>
                    <p className={styles.aboutfont}>
                    Voluntain website helps students, who listen to our lectures. Within our site, students can take lecture videos, and check practical questions and answers. Students can also send us various questions about what they don't know or are curious about.
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
                  Voluntain pursues the continuous learning of students.
                  </p>
                  <br></br>
                  <p className={styles.aboutfont}>
                  The existing ‘World Friends ICT SW Volunteers’ has the disadvantage of being one-time. With one month of training, it was difficult for students to learn the software perfectly, and expect the continuity of learning. Also, offline dispatch has become even more impossible due to COVID-19. 
                  In this situation, Voluntain will help students' continuous learning by providing easily accessible online lectures. We hope that students can access SW classes without time and space constraints and finally contribute to bridging the information gap between countries.
                  </p>
                  <br></br>
                  <p className={styles.aboutfont2}>
                  Voluntain pursues open communication with students abroad.
                  </p>
                  <br></br>
                  <p className={styles.aboutfont}>
                  Communication is an important part of learning. Voluntain provides a website for students to communicate with volunteers and students can use our website to solve their questions freely. Open communication will reach students' better learning.
                  </p>
                  <br></br>
                  <p className={styles.aboutfont2}>
                  Voluntain pursues the promotion of Korean culture.
                  </p>
                  <br></br>
                  <p className={styles.aboutfont}>
                  We not only hope students become familiar with Korea but also share culture with each other. Therefore, our ultimate vision is to become global people through cultural exchanges.
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
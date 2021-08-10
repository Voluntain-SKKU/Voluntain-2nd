import React from 'react'
import Head from 'next/head'
import { NavigationBar } from '../components/NavigationBar'
import { MainBanner } from '../components/MainBanner'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import styles from '../styles/Home.module.css'
import { url } from '../config/next.config' //url 가져오기

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1200,
    
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  typography:{

  },
  typographytitle:{

  }
}));

export default function Page( { titles }) {
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <Head>
          <title>About Voluntain</title>
      </Head>
      <div className="Head">
        <NavigationBar titles={titles} />
        <MainBanner />
      </div>
      <br></br>
      <br></br>
      <main>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src="/logo.png" />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={3}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom className={classes.typographytitle}>
                      Voluntain introduces and teaches programming easily for children and students abroad.
                    </Typography>
                    <br></br>
                    <Typography variant="body1" className={classes.typography}>
                      We produce online lectures so that people can easily approach and understand programming. The lectures have topics such as Scratch and Python. We also provide practice questions to help students apply their understanding.
                    </Typography>
                    <br></br>
                    <Typography variant="body1" className={classes.typographytitle} gutterBottom>
                    Voluntain will make your learning easier by the website.
                    </Typography>
                    <br></br>
                    <Typography variant="body1" className={classes.typography}>
                    Voluntain website helps students, who listen to our lectures. Within our site, students can take lecture videos, and check practical questions and answers. Students can also send us various questions about what they don't know or are curious about.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <br></br>
        <br></br>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                  <Typography gutterBottom variant="h5" className={classes.typographytitle}>
                    Vision
                  </Typography>
                  <br></br>
                  <Typography variant="body1" className={classes.typographytitle} gutterBottom>
                  Voluntain pursues the continuous learning of students.
                  </Typography>
                  <br></br>
                  <Typography variant="body1" className={classes.typography}>
                  The existing ‘World Friends ICT SW Volunteers’ has the disadvantage of being one-time. With one month of training, it was difficult for students to learn the software perfectly, and expect the continuity of learning. Also, offline dispatch has become even more impossible due to COVID-19. 
                  In this situation, Voluntain will help students' continuous learning by providing easily accessible online lectures. We hope that students can access SW classes without time and space constraints and finally contribute to bridging the information gap between countries.
                  </Typography>
                  <br></br>
                  <Typography variant="body1" className={classes.typographytitle} gutterBottom>
                  Voluntain pursues open communication with students abroad.
                  </Typography>
                  <br></br>
                  <Typography variant="body1" className={classes.typography}>
                  Communication is an important part of learning. Voluntain provides a website for students to communicate with volunteers and students can use our website to solve their questions freely. Open communication will reach students' better learning.
                  </Typography>
                  <br></br>
                  <Typography variant="body1" className={classes.typographytitle} gutterBottom>
                  Voluntain pursues the promotion of Korean culture.
                  </Typography>
                  <br></br>
                  <Typography variant="body1" className={classes.typography}>
                  We not only hope students become familiar with Korea but also share culture with each other. Therefore, our ultimate vision is to become global people through cultural exchanges.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <br></br>
      <br></br>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h5" className={classes.typographytitle}>
                    History
                  </Typography>
                  <br></br>
                  <Typography variant="body1" gutterBottom className={classes.typographytitle}>
                  2020.11 Voluntain foundation
                  </Typography>
                  <br></br>
                  <Typography variant="body1" gutterBottom className={classes.typographytitle}>
                  2021.06 1st Voluntain Community launched
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <br></br>
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
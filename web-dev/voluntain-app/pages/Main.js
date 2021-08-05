import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  markdown: {
    backgroundColor: theme.palette.grey[200],
  },
}));

export default function Main(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={10}>
      <Typography variant="h3" m={2} pt={3}>
        Introduction
      </Typography>
      <br></br>
      <Divider />
      <br></br>
      <Typography variant="h5" color="secondary" align="center" m={1} pt={2} className={classes.markdown}>Study All Together, Voluntain!</Typography>
      <Typography variant="h5" color="secondary" align="center" m={1} pt={2} className={classes.markdown}>Voluntain is a programming education volunteer club by Sungkyunkwan University students.</Typography>  
      <br></br>
      <Typography variant="h5" align="left" m={2} pt={3}>▶ Voluntain introduces and teaches programming easily for children and students abroad.</Typography>
      <Typography variant="body1" align="left" m={2} pt={3}>We produce online lectures so that people can easily approach and understand programming. The lectures have topics such as Scratch and Python. We also provide practice questions to help students apply their understanding.</Typography>
      <br></br>
      <Typography variant="h5" align="left" m={2} pt={3}>▶ Voluntain will make your learning easier by the website.</Typography>
      <Typography variant="body1" align="left" m={2} pt={3}>Voluntain website helps students, who listen to our lectures. Within our site, students can take lecture videos, and check practical questions and answers. Students can also send us various questions about what they don't know or are curious about.</Typography>
      <br></br>
      <br></br>
      <br></br>
      <Typography variant="h3" m={2} pt={3}>
        Vision
      </Typography>
      <br></br>
      <Divider />
      <br></br>
      <Typography variant="h5" align="left" m={2} pt={3}>▶ Voluntain pursues the continuous learning of students.</Typography>
      <Typography variant="body1" align="left" m={2} pt={3}>The existing ‘World Friends ICT SW Volunteers’ has the disadvantage of being one-time. With one month of training, it was difficult for students to learn the software perfectly, and expect the continuity of learning. Also, offline dispatch has become even more impossible due to COVID-19. </Typography>
      <Typography variant="body1" align="left" m={2} pt={3}>In this situation, Voluntain will help students' continuous learning by providing easily accessible online lectures. We hope that students can access SW classes without time and space constraints and finally contribute to bridging the information gap between countries.</Typography>
      <br></br>
      <Typography variant="h5" align="left" m={2} pt={3}>▶ Voluntain pursues open communication with students abroad.</Typography>
      <Typography variant="body1" align="left" m={2} pt={3}>Communication is an important part of learning. Voluntain provides a website for students to communicate with volunteers and students can use our website to solve their questions freely. Open communication will reach students' better learning.</Typography>
      <br></br>
      <Typography variant="h5" align="left" m={2} pt={3}>▶ Voluntain pursues the promotion of Korean culture.</Typography>
      <Typography variant="body1" align="left" m={2} pt={3}>We not only hope students to become familiar with Korea but also share culture with each other. Therefore, our ultimate vision is to become global people through cultural exchanges.</Typography>
      <br></br>
      <br></br>
      <br></br>
      <Typography variant="h3" m={2} pt={3}>
        History
      </Typography>
      <br></br>
      <Divider />
      <br></br>
      <Typography variant="h5" align="left" m={2} pt={3}>▶ Feburary 2020 Voluntain foundation</Typography>
      <Typography variant="h5" align="left" m={2} pt={3}>▶ June 2021 1st Voluntain Community launced</Typography>
    
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { NavigationBar } from '../components/NavigationBar'
import MainFeaturedPost from './MainFeaturedPost';
import Grid from '@material-ui/core/Grid';
import Main from './Main';
//import Sidebar from './Sidebar';
//import CssBaseline from '@material-ui/core/CssBaseline';

const mainFeaturedPost={
    title: 'Voluntain',
    description: "Learn everything, everywhere!",
    image:'https://cdn.imweb.me/upload/S201903305c9eef8b6770d/638816db79c60.png',
}

const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(4),
      marginLeft: theme.spacing(4),
    },
}));

const sidebar = {
    archives: [
      { title: 'Feburary 2020 Voluntain foundation', url: '#' },
      { title: 'June 2021 1st Voluntain Community launced', url: '#' },
    ],
  };

export default function Page() {
    const classes = useStyles();

  return (
    <div>
      <div className="Head">
        <NavigationBar />
      </div>
      <main>
          <MainFeaturedPost post={mainFeaturedPost}/>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main/> 
            {/*<Sidebar                           
            archives={sidebar.archives}             
            />*/}           
          </Grid>
      </main>
    </div>

    
  )
}

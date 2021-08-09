import Head from 'next/head'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { NavigationBar } from '../components/NavigationBar'
import MainFeaturedPost from './MainFeaturedPost';
import Grid from '@material-ui/core/Grid';
import Main from './Main';
//import Sidebar from './Sidebar';
//import CssBaseline from '@material-ui/core/CssBaseline';

import { url } from '../config/next.config' //url 가져오기
import { MainBanner } from '../components/MainBanner';

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

export default function Page( { titles } ) {
    const classes = useStyles();

  return (
    <div>
      <Head>
        <title>About Us - Voluntain</title>
      </Head>
        <NavigationBar titles={titles}/>
        <MainBanner/> 
      <main>
          {/* <MainFeaturedPost post={mainFeaturedPost}/> */}
          <Main />
          <Grid container spacing={5} className={classes.mainGrid}>
            {/*<Sidebar                           
            archives={sidebar.archives}             
            />*/}           
          </Grid>
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

import React from 'react'
import { Button, Card, CardContent, Divider, Fab, Hidden, Link, Typography } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List';

import { url } from "../../config/next.config";
import { VideoPlayer } from '../../components/VideoPlayer'
import { NavigationBar } from '../../components/NavigationBar'
import { Comment } from '../../components/Comment'
import { SideBar } from '../../components/SideBar'
import { LectureCards } from '../../components/LectureCards'
import styles from '../../styles/Home.module.css'

/**
 * This function is executed when the floating-button that appears when page
 * width is small is clicked.
 * This does nothing now, but might be replaced with another function.
 */
 function nop() { }

 /**
  * @requires (from backend)
  * 1. lectureList
  * 2. isFirstLecture
  * 3. isLastLecture
  * 4. Lecture Title
  * 5. videoId
  * 6. the upper LectureCard title / contents
  * 7. the lower LectureCard title / contents
  * 
  * @variation
  * 1. Add or remove Dividers
  * 2. Modify style around Cards
  */
 export default function LecturePage() {
   /**
    * This composes the content of the sidebar.
    */
   const lectureList = [
     'About Scratch',
     'Easy',
     'Hard',
   ];
 
   const lowerCardContent = [
     { 'title': 'Contents', 'content': "- About Scratch (0:00) \n- Exercises (2:00)" },
     { 'title': 'See Also', 'content': "https://google.com \nhttps://bing.com" },
   ]
 
   /**
    * These check whether the current lecture is the first or last one.
    * If it is, disable Prev or Next button.
    */
   const isFirstLecture = true;
   const isLastLecture = false;
 
   return (
     <div className={styles.container}>
       <NavigationBar />
 
       <div className="Body">
         <div className="LeftSide" style={{ float: 'left' }}>
           <Hidden smDown>
             <SideBar height={1000} width={200} />
           </Hidden>
         </div>
       </div>
 
     </div>
   )
 }

// {url}/courses/id 에 GET Request 보내 courses 정보 받아오기
export const getStaticProps = async (context) => {
  const data = await fetch(`${url}/courses/${context.params.id}`);
  const course = await data.json();

  return {
      props: { course },
      revalidate: 1,
  };
};


export async function getStaticPaths() {
  const res = await fetch(`${url}/courses`);
  const courses = await res.json();

  const paths = courses.map((item)=> ({
      params: { id: item.id.toString() },
  }));

  return { paths, fallback: false };
};

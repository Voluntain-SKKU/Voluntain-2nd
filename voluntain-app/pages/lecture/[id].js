import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { url } from '../../config/next.config'
import Youtube from 'react-youtube';
import Router from 'next/router';
import Link from "next/link";
import React, { useState, useEffect } from 'react'

import { Button, Collapse, Drawer, Fab, List, ListItem, ListItemText, Hidden } from '@material-ui/core'

import { LectureCards } from '../../components/LectureCards'
import { Sidebar } from '../../components/Sidebar'


export default function Home({ course, course2 }) {
    /*const [lectureId, setLectureId] = useState(0);
    // disqus 설정
    const disqusShortname = "skku-voluntain"
    const disqusConfig = {
        url: "http://localhost:3000/newcourse/"+course.id + '/' + course.lectures[lectureId].lecture_number,
        identifier : course.id + '/' + course.lectures[lectureId].lecture_number,
        title: course.lectures[lectureId].title // Single post title
    }*/
  //move to the course page of the lecture
  const handleClick = (e) => {
    e.preventDefault()
    var link="/newcourse/" + course.id;
    Router.push(link);
   };

   //move to the main
   const handleClick2=(e)=>{
    e.preventDefault()
    Router.push('/');
   }

   const list=() =>{
    <div>
      {course2.lectures.map((element, index)=>{
        return(
          <li class="list-group-item">
            <div className={styles.courselist}>
                <div class="ms-2 me-auto">
                  <div class="fw-bold">
                    <Link href={"/lecture/" + (element.id==undefined?'landing':element.id)}>
                      <h5>{element.title}</h5>
                    </Link>
                  </div>
                </div>
            </div>
          </li>
        )
      })}
    </div>
   }
 
  return (
    <div>
      <Head>
        <title>{course.title}</title>
      </Head>
      <div class="container d-md-flex align-items-stretch">
      <div>
      <div className={styles.course} class="px-4 pt-5 my-5 text-center border-bottom">
        <h1 class="display-4 fw-bold">{course.title}</h1>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">{course.about}</p>
                <div className='videoresponsive'>
                  <Youtube videoId={course.video_link}/>
                </div>
                <br></br>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3" onClick={(e) => handleClick(e)}>
                      Go back to course
                    </button>
                    <button type="button" class="btn btn-outline-secondary btn-lg px-4" onClick={(e) => handleClick2(e)}>
                      Go back to main
                    </button>
                </div>
            </div>
        </div>

        <div className={styles.lectureCardContainer}>
            {/*<div className={styles.lectureCardsRow}>
              <LectureCards
                title='Lecture Info'
                content={course.about}
              />
            </div>*/}
            <div className={styles.lectureCardsRow}>
              <LectureCards
                title='Exercise'
                content={course.exercise_question}
              />
            </div>
        </div>
        </div>

        </div>
    </div>
  )
}

// send GET Request to {url}/lectures and get course list
export const getStaticProps = async (context) => {
  const data = await fetch(`${url}/lectures/${context.params.id}`);
  const course = await data.json();

  const data2 = await fetch(`${url}/courses/${context.params.id}`);
  const course2 = await data2.json();

  return {
    props: { course, course2 },
    revalidate: 1,
  };
};

// send GET Request to {url}/lectures and get course list
export async function getStaticPaths() {
    const res = await fetch(`${url}/lectures`);
    const courses = await res.json();
  
    const paths = courses.map((item) => ({
      params: { id: item.id.toString() },
    }));

    const res2 = await fetch(`${url}/courses`);
    const courses2 = await res2.json();
  
    const paths2 = courses2 && courses2.map((item) => ({
      params: { id: item.id.toString() },
    }));

    return { paths, paths2, fallback: false };
  };
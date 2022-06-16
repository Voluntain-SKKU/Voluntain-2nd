import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { url } from '../config/next.config'
import Youtube from 'react-youtube';
import Router from 'next/router';
import Link from "next/link";
import React, { useState, useEffect } from 'react'


export const Sidebar=(course)=>{
   
    const list=() =>{
        <div>
          {course.lectures.map((element, index)=>{
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
       
    return(
        <nav id="sidebar">
          <div class="p-4 pt-5">
            <h5>Lectures</h5>
          </div>
          {list()}
        </nav>
    );
}

// send GET Request to {url}/courses and get course list
export const getStaticProps = async (context) => {

    const data = await fetch(`${url}/courses/${context.params.id}`);
    const course = await data.json();
  
    return {
      props: { course },
      revalidate: 1,
    };
  };
  
  // send GET Request to {url}/courses and get course list
  export async function getStaticPaths() {
      const res = await fetch(`${url}/courses`);
      const courses = await res.json();
    
      const paths = courses && courses.map((item) => ({
        params: { id: item.id.toString() },
      }));
    
      return { paths, fallback: false };
    };
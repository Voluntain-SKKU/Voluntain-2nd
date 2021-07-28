import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Navbar } from '../components/Navbar'
import {url} from '../config/next.config' //url 가져오기

import { NavigationBar } from '../components/NavigationBar'
import { MainBanner } from '../components/MainBanner'
import { MainCard } from '../components/MainCard'
import { Card, Button } from 'react-bootstrap';


export default function Home( {courses, titles} ) {

  return (
    <div className={styles.container}>
      <Head>
        <title> Voluntain </title>
        <meta name="description" content="SKKU Global Volunteer Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Nav Bar Component */}
      <NavigationBar titles={titles}/>

      <MainBanner />

      <MainCard courses={courses}/>

      {/* Footer component 분리해야함 */}
      <footer className={styles.footer}>
        <span className={styles.h1}>
          Powered by Voluntain
          </span>
      </footer>
    </div>
  )
}

// {url}/courses 에 GET Request 보내 course list 받아오기 (id, title, about, level)
export const getStaticProps = async () => {
  const data = await fetch(`${url}/courses`);
  const courses = await data.json();

  // 이거 courses에서 뽑아오고 싶은데??
  const data0 = await fetch(`${url}/courses/title`);
  const titles = await data0.json();

  return {
    props: { courses, titles },
    revalidate: 1,//몇 초로 할지?
  };
};
 
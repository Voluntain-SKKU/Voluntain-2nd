import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Navbar } from '../components/Navbar'
import {url} from '../config/next.config' //url 가져오기

import { NavigationBar } from '../components/NavigationBar'
import { MainBanner } from '../components/MainBanner'
import { MainCard } from '../components/MainCard'
import { Card, Button } from 'react-bootstrap';


export default function Home( {courses} ) {
  return (
    <div className={styles.container}>
      <Head>
        <title> Voluntain </title>
        <meta name="description" content="SKKU Global Volunteer Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Nav Bar Component */}
      <NavigationBar />


      <main className={styles.main}>
      
        <h1 className={styles.title}>
          VOLUNTAIN
        </h1>
        {/* data test */}
        <h3>LIST</h3>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              
                <a>{course.title}</a>
                <a>{course.about}</a>
                <a>{course.level}</a>
                
              
            </li>
          ))}
        </ul>
        {/*Grid Card Menu */}
        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      <MainBanner />
      {/* Component 분리 ?? */}
      {/* <div className={styles.card}> */}
      {/* </div> */}
      <MainCard/>

      {/* Footer component 분리 */}
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

  return {
    props: { courses },
    revalidate: 1,//몇 초로 할지?
  };
};

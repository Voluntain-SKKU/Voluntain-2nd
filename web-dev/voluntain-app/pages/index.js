import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Navbar } from '../components/Navbar'
import { url } from '../config/next.config' //url 가져오기

import { VideoPlayer } from '../components/VideoPlayer'
import { NavigationBar } from '../components/NavigationBar'
import { MainBanner } from '../components/MainBanner'
import { MainCard } from '../components/MainCard'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

import { useCookies } from 'react-cookie'
import React from 'react'
import { Alert } from 'react-bootstrap'


export default function Home({ courses, titles }) {

  /**
   * Cookie examples
   */
  const [cookies, setCookie, removeCookie] = useCookies(['videoState', 'noCookie', 'cookieAlert']);

  // 1. videoState
  function Greeting() {
    // if (cookies.videoState === undefined) {
    //   return <h1>Welcome!</h1>
    // } else {
      return (
        <Card className={styles.colcard}>
          <Card.Header className="h2 p-4" bg="Dark"> To continue learning <span className="fw-bold h3 text-success">SCRATCH</span> </Card.Header>
          {/* <Card.Img variant="top" src="/vercel.svg" /> */}
          <div className="d-xl-inline-flex flex-row p-3 my-2"> 
            <Card.Body >
              <ListGroup className={styles.cardlist}>
                <ListGroupItem className="text-center h4 fw-bold">LECTURE Info</ListGroupItem>
                <ListGroupItem>[SCRATCH] Lec.1 Introduction </ListGroupItem>
              </ListGroup>
              <ListGroup className={styles.cardlist}>
                <ListGroupItem className="text-center h4 fw-bold">{cookies.videoState}</ListGroupItem>
                <ListGroupItem><Button variant="success"> Go to lecture page </Button></ListGroupItem>
              </ListGroup>
              
            </Card.Body>
            <div> <VideoPlayer videoId='_9RvpFdUQr0'/> </div>
          </div>
        </Card>
      )
    // }
  } 

  // 3. cookieAlert
  /**
   * Show alert only if user has not accepted, and noCookie is not set.
   */
  function getInitialCookieAlert() {
    if (cookies.cookieAlert === undefined && (cookies.noCookie === false || cookies.noCookie === undefined)) {
      return true;
    } else {
      return false;
    }
  }

  const [cookieAlertShow, setCookieAlertShow] = React.useState(getInitialCookieAlert());

  /**
   * NOTE: delete the maxAge value for release builds.
   */
  const handleCookieAlertOff = () => {
    // If user press the accept button, do not show the alarm again.
    setCookieAlertShow(false);
    setCookie('cookieAlert', false, { maxAge: 30 });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title> Voluntain </title>
        <meta name="description" content="SKKU Global Volunteer Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Nav Bar Component */}
      <NavigationBar titles={titles} />

      <MainBanner />

      {/* cookie 사용 - 강의 영상 추천 */}
      <Greeting />

      <MainCard courses={courses} />

      {/* cookie 수집 동의 */}
      <Alert className={styles.cookieAlert} variant='dark' show={Boolean(cookieAlertShow)}>
        <Alert.Heading>This website uses cookies.</Alert.Heading>
        <p>
          We use cookies in order to provide you better experiences.
          If you want more information, please visit our {' '}
          <Alert.Link href="/setting">cookie policy page.</Alert.Link>
        </p>
        <Button variant='secondary' onClick={handleCookieAlertOff}>ACCEPT</Button>
      </Alert>

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

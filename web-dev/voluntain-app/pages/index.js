import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { url } from '../config/next.config' //url 가져오기

import { NavigationBar } from '../components/NavigationBar'
import { MainBanner } from '../components/MainBanner'
import { MainCard } from '../components/MainCard'
import { RecentLecture } from '../components/RecentLecture'

import { Alert, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

import { Footer } from '../components/Footer'

import * as ga from '../lib/ga'

export default function Home({ courses, titles }) {
  /**
   * Cookie examples
   */
  const [cookies, setCookie, removeCookie] = useCookies(['videoState', 'noCookie', 'cookieAlert']);

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

  const handleCookieAlertOff = () => {
    // If user press the accept button, do not show the alarm again.
    setCookieAlertShow(false);
    setCookie('cookieAlert', false, { path: '/', maxAge: 31536000 });
  }

  /**
   * Logging example
   */
   const search = () => {
     ga.event({
       action: "search",
       params : {
         search_term: " "
       }
     })
   }

  return (
    <div className={styles.container}>
      <Head>
        <title> Main - Voluntain </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar titles={titles} />
      <MainBanner />

      <div className={styles.main}>
        <RecentLecture />
        <MainCard courses={courses} />
      </div>

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

      <Footer />
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

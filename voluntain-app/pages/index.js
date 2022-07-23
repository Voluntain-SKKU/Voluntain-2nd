import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { url, assetPrefix } from '../config/next.config' //url 가져오기

import { MainBanner } from '../components/MainBanner'
import { MainCard } from '../components/MainCard'
import { RecentLecture } from '../components/RecentLecture'

import { Alert, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

export default function Home({ courses, lectures }) {
  const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'videoState', 'noCookie', 'cookieAlert']);

  function getInitialCookieAlert() {
    if (cookies.cookieAlert === undefined && (cookies.noCookie === false || cookies.noCookie === undefined)) {
      return true;
    } else {
      return false;
    }
  }

  const [cookieAlertShow, setCookieAlertShow] = React.useState(getInitialCookieAlert());

  /**
   * 사용자가 쿠키 동의 버튼을 눌렀을 경우에 실행됩니다.
   * 1년 동안 쿠키 알람을 끕니다.
   */
  const handleCookieAlertOff = () => {
    setCookieAlertShow(false);
    setCookie('cookieAlert', false, { path: '/', maxAge: 31536000 });
  }

  /**
   * 사용자가 마지막에 시청한 코스의 id 값을 가져옵니다.
   * 메인 페이지의 recent lecture 부분에서 필요한, 강의 목록을 fetch할 때
   * 사용됩니다.
   */
  let recentCourseID = 0;
  courses.map((element, index) => {
    if (cookies.courseId !== undefined && cookies.courseId == element.id) {
      recentCourseID = element.id
    }
  })

  /**
   * 위에서 구한 최근 코스로부터, 해당 코스의 강의 목록을 fetch합니다.
   * e.g. localhost:1337/courses/1, localhost:1337/courses/2로부터 fetch
   * 
   * 첫 페이지 렌더링 시, 서버 사이드에서는 브라우저에 저장된 쿠키 값에 접근할
   * 수 없으므로, 첫 렌더링 이후에 한 번만 아래 코드를 실행하여 값을 업데이트
   * 합니다. (따라서 useEffect의 dependency를 비웁니다.)
   * 
   * getStaticProps에서 주어진 /courses/1에서 최초 fetching을 시행하며,
   * 쿠키 값을 받은 이후 /courses/{recentCourseId}에서 다시 fetching을 합니다.
   */
  const [recentCourse, setRecentCourse] = React.useState(lectures.lectures);
  React.useEffect(() => {
    const fetchList = async () => {
      // console.log(`fetcing from: ${url}/newcourse/${recentCourseID}`)
      await fetch(`${url}/lecture/${recentCourseID}`)
        .then((response) => response.json())
        .then(res => {
          setRecentCourse(res.lectures);
        })
    }
    fetchList();
  }, [])
  // console.log(recentCourse);

  return (
    <div className={styles.container}>
      <Head>
        <title> Main - Voluntain </title>
        <link rel="icon" href={assetPrefix + "/favicon.ico"} />
      </Head>

      <MainBanner />

      {/* Main page 콘텐츠 공통 레이아웃을 사용합니다. */}
      <div className={styles.main}>
        {/* cookie로 학습 이어하기 기능을 위한 컴포넌트를 나타냅니다. */}
        <RecentLecture lectures={recentCourse} />
        <MainCard courses={courses} />
      </div>

      {/* cookie 수집 동의 */}
      <Alert className={styles.cookieAlert} variant='dark' show={Boolean(cookieAlertShow)}>
        <Alert.Heading>This website uses cookies.</Alert.Heading>
        <p>
          We use cookies in order to provide you better experiences.
          If you want more information, please visit our {' '}
          <Alert.Link href="./setting">privacy policy page.</Alert.Link>
        </p>
        <Button variant='secondary' onClick={handleCookieAlertOff}>ACCEPT</Button>
      </Alert>
    </div>
  )
}

/**
 * @note
 * Strapi backend에 API를 사용하여 데이터 받아옵니다.
 * 
 * @returns {*} props
 */
// 
// API{url}/courses GET Request 보내 course list 받아오기 (id, title, about, level)
// {url}/courses 에 GET Request 보내 course list 받아오기 (id, title, about, level, logo_img)
// {url}/courses/title 에 GET Request 보내 course title list 받아오기 (id, title)
export const getStaticProps = async () => {
  const data = await fetch(`${url}/courses`);
  const courses = await data.json();

  const data0 = await fetch(`${url}/courses/title`);
  const titles = await data0.json();

  const LEC = await fetch(`${url}/courses/1`);
  const lectures = await LEC.json();

  return {
    props: { courses, titles, lectures },
    revalidate: 1,
  };
};

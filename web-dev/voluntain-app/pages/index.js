import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NavigationBar } from '../components/NavigationBar'
import { MainBanner } from '../components/MainBanner'
import { MainCard } from '../components/MainCard'
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title> Voluntain </title>
        <meta name="description" content="SKKU Global Volunteer Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Nav Bar Component */}
      <NavigationBar />

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

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { NavigationBar } from '../components/NavigationBar'
import { MainBanner } from '../components/MainBanner'
import { Card, Button } from 'react-bootstrap';

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
      <div className={styles.card}>
        <Card>
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>

      <footer className={styles.footer}>
        <span className={styles.h1}>
          Powered by Voluntain
          </span>
      </footer>
    </div>
  )
}

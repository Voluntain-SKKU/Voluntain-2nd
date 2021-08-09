import Head from 'next/head'
import styles from '../../styles/Home.module.css'


import { Footer } from '../../components/Footer'

export default function landing({ courses, titles }) {


  return (
    <div className={styles.container}>
      <Head>
        <title> Voluntain </title>
        <meta name="description" content="SKKU Global Volunteer Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Preparing</h1>

      <Footer />
    </div>
  )
}

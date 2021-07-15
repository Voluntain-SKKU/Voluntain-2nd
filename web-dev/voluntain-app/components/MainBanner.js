/*  ./components/Navbar.js     */
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css'

import {  } from 'react-bootstrap';

// export default - const difference
export const MainBanner = () => {
  return (
    <div className={styles.banner} fixed="top">
      <link // bootstrap css 가져오기
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      <div className={styles.title}>
        VOLUNTAIN
      </div>
      <div className={styles.description}>
        Learn everthing everywhere
      </div>
    </div>
  );
};
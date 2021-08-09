/*  ./components/Navbar.js     */
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// export default - const difference
export const MainBanner = () => {
  return (
    <div className={styles.mainwrapper}>
    <div className={styles.banner}>
      <div className={styles.maintitle}>VOLUNTAIN</div>
      <div className={styles.slogan}>
        Study All Together, Voluntain!  
      </div>
    </div>
    </div>
  );
};
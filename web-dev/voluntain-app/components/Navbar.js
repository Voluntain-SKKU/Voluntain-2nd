/*  ./components/Navbar.js     */
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css'

// export default - const difference
export const Navbar = () => {
  return (
    <>
      <nav className={styles.nav}>
        <Link href='/lecture'>
          <Image 
          src="/logo.png" alt="voluntain logo" 
          width={50} height={50}
          />
        </Link>
        <div className={styles.menu}>
          <p>Nav Bar Here</p>
        </div>
      </nav>
    </>
  );
};
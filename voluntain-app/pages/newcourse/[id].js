import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { url } from '../../config/next.config'
import Link from "next/link";

export default function Home({ course }) {
  //shows the list of lectures of the course
  const list = () => (
    //map each item of lecture list to the li
    <div>
      {course.lectures.map((element, index) => {
        return (
          <ul className="list-group" key={index} >
            <li className="list-group-item list-group-item-action">
              <div className={styles.courselist}>
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    <Link href={"/lecture/" + (element.id == undefined ? 'landing' : element.id)}>
                      <h5>{element.title}</h5>
                    </Link>
                  </div>
                  <br></br>
                  <p>{element.about}</p>
                </div>
              </div>
            </li>
          </ul>
        )
      })}

    </div>
  );

  return (
    <div>
      <Head>
        <title>{course.title}</title>
      </Head>
      <div className="mx-5 my-3 d-md-flex align-items-stretch">
        <div className="px-2 pt-5 text-center border-bottom">
          <h1 className="display-4 fw-bold">{course.title}</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">{course.about}</p>
          </div>
          {/*<div class="overflow-hidden">
                <div class="container px-5">
                    <img src={`${url}`+course.logo_img.url} class="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy"/>
                </div>
  </div>*/}
          <div className="card text-center">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="true" href="#">Lectures</a>
                </li>
              </ul>
            </div>
            {list()}
          </div>
        </div>

      </div>
    </div>
  )
}

// send GET Request to {url}/courses and get course list
export const getStaticProps = async (context) => {

  const data = await fetch(`${url}/courses/${context.params.id}`);
  const course = await data.json();

  return {
    props: { course },
    revalidate: 1,
  };
};

// send GET Request to {url}/courses and get course list
export async function getStaticPaths() {
  const res = await fetch(`${url}/courses`);
  const courses = await res.json();

  const paths = courses && courses.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return { paths, fallback: false };
};
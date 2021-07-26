import React from 'react'
import Button from 'react-bootstrap/Button'
import { Divider, Hidden } from '@material-ui/core'

import { VideoPlayer } from '../components/VideoPlayer'
import { NavigationBar } from '../components/NavigationBar'
import { Comment } from '../components/Comment'
import { LectureText } from '../components/LectureText'
import { SideBar } from '../components/SideBar'
import { url } from "../../config/next.config";

export default function Page() {
  return (
    <div>
      <div className="Head">
        <NavigationBar />
      </div>

      <div className="Body">
        <div className="LeftSide" style={{ float: 'left' }}>
          <Hidden smDown>
            <SideBar height={1000} width={200} />
          </Hidden>
        </div>

        <div className="RightSide" style={{ float: 'left', margin: 10 }}>
          <div className="LectureTitle" style={{ margin: 10 }}>
            <h1>{course.lectures[0].id}</h1>
          </div>

          <div className="Buttons" style={{ marginBottom: 70 }}>
            <div style={{ float: 'left' }}><Button variant="light">{'< Prev'}</Button></div>

            <div style={{ float: 'right' }}><Button variant="dark">{'Next >'}</Button></div>
          </div>

          <div className="Player" style={{ clear: 'both' }}>
            <VideoPlayer videoId='_9RvpFdUQr0' />
          </div>

          <div>
            <LectureText
              title="This course is ..."
              content="for beginners. Try it!"
            />
            <Divider style={{ background: 'black' }} variant='middle' />
            <LectureText
              title="Exercise "
              content="Do this exercise!"
            />
          </div>

          <div className="Comment">
            <Comment />
          </div>
        </div>
      </div>
    </div>
  )
}

// {url}/courses/id 에 GET Request 보내 courses 정보 받아오기
export const getStaticProps = async (context) => {
  const data = await fetch(`${url}/courses/${context.params.id}`);
  const course = await data.json();

  return {
      props: { course },
      revalidate: 1,
  };
};


export async function getStaticPaths() {
  const res = await fetch(`${url}/courses`);
  const courses = await res.json();

  const paths = courses.map((item)=> ({
      params: { id: item.id.toString() },
  }));

  return { paths, fallback: false };
};

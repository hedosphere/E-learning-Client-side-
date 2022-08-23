import { useContext, useEffect, useState } from "react";
import axios from "axios";
import RequireSignin from "../../component/route/RequireSignin";
import Link from "next/link";

import { Context } from "../../context";
import { useRouter } from "next/router";
import {
  SyncOutlined,
  PlayOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
} from "@ant-design/icons";

const userIndex = () => {
  const [courses, setCourses] = useState([]);
  const {
    state: { user },
  } = useContext(Context);

  const fetchCourses = async (e) => {
    // console.log("to fetch course");
    const { data } = await axios.get(`/api/user/course`);
    setCourses(data);
    // console.log(data);
  };
  useEffect(
    (e) => {
      fetchCourses();
    },

    []
  );
  return (
    <RequireSignin>
      <>
        <h1 className="jumbotron bg-danger">user </h1>
        {/* <pre>{JSON.stringify(courses[0], null, 4)}</pre> */}
        <div className="container-fluid">
          {/* <div className="row"> */}
          {courses &&
            courses.map((course) => (
              <div className="row mt-2 mb-2" key={course._id}>
                <div className="ant-col-xs-3">
                  {/* {course.name} */}
                  <img
                    src={course.image.Location}
                    width="100px"
                    height="100px"
                    alt={course.name}
                  />
                </div>
                <div className="col">
                  <Link href={`/user/course/${course.slug}`}>
                    <a className="h3 nolinkdecoration">{course.name}</a>
                  </Link>
                  <p>
                    <b>{course.lesson.length} Lessons</b>
                  </p>
                  <p style={{ marginTop: "-15px" }}>
                    By <em>{course.instructor.name} </em>
                  </p>
                </div>
                <div className="ant-col-xs-3 p-2">
                  <Link href={`/user/course/${course.slug}`}>
                    <a
                      className="
                     nolinkdecoration"
                    >
                      <PlayCircleOutlined className="  text-primary display-6 " />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          {/* </div> */}
        </div>
      </>
    </RequireSignin>
  );
};
export default userIndex;

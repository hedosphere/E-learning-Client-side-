import { useEffect, useState } from "react";
import axios from "axios";
import RequireInstructor from "../../component/route/requireinstructor";
import { Avatar, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  UserSwitchOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import Link from "next/link";

const userIndex = () => {
  const [courses, setCourses] = useState([]);
  const [enroll, setEnroll] = useState(0);
  const getCourses = async (p) => {
    //  slug
    try {
      const { data } = await axios.get("api/instructor-courses");
      setCourses(data);
    } catch (err) {
      toast("err.response.data");
    }
  };
  useEffect((p) => {
    getCourses();
  }, []);

  //

  //

  //

  // class

  return (
    <RequireInstructor>
      <>
        <h1 className="jumbotron bg-danger">Instructor </h1>
        <>
          {courses &&
            courses.map((course) => (
              <div key={course._id} className="media pl-2 row">
                <>
                  <div className="media-left ant-col-xs-1">
                    <Link href={`/instructor/courses/view/${course.slug}`}>
                      <a>
                        <Avatar
                          alt={course.name}
                          size={100}
                          className="mt-2 media-object"
                          src={
                            course.image
                              ? course.image.Location
                              : "pictures/avatar.png"
                          }
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="media-body col pl-2">
                    {/* <div className="media-body pl-2"> */}
                    <div className="row">
                      <div className="col">
                        <h2 className="mt-2" style={{ size: "1px" }}>
                          <Link
                            href={`/instructor/courses/view/${course.slug}`}
                          >
                            {course.name}
                          </Link>
                        </h2>
                        <p style={{ marginTop: "-5px" }}>
                          <b> {course.lesson.length} Lessons </b>
                        </p>
                        <p style={{ marginTop: "-15px" }}>
                          {course.lesson.length < 5 ? (
                            <span className="text-danger">
                              At least minimum of 5 lessons is required to
                              publish a course
                            </span>
                          ) : course.published ? (
                            <span className="text-success">
                              Your course is live in the market places
                            </span>
                          ) : (
                            <span className="text-warning">
                              Your course is ready to be publish
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ant-col-xs-2">
                    <h4 className="pointer mt-3">
                      {course.published ? (
                        <Tooltip className="x" title="Published">
                          <CheckCircleOutlined className="text-success" />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Unpublish">
                          <CloseCircleOutlined className="text-warning" />
                        </Tooltip>
                      )}
                    </h4>
                  </div>
                  {/* </div> */}
                </>
                <hr />
              </div>
            ))}
        </>
      </>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre>\<></> */}
    </RequireInstructor>
  );
};
export default userIndex;

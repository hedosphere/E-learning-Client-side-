import { Avatar, Badge, Button } from "antd";
import ReactPlayer from "react-player";
import { CurrencyFormatter } from "../../component/helper/CurrencyConvert";
import { useEffect, useContext, useState } from "react";
import { CarryOutOutlined } from "@ant-design/icons";
import { Context } from "../../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
//

const SingleCourseCard = ({
  course,
  showModal,
  preview,
  setPreview,
  setShowModal,

  enrollStatus,
  setEnrollStatus,
  loading,
  setLoading,
}) => {
  const {
    state: { user },
  } = useContext(Context);

  //
  const [courses, setCourses] = useState({});
  const router = useRouter();
  //

  const getEnrollStatus = async (e) => {
    // e.preventDefault();
    try {
      const { data } = await axios.get(`/api/enroll-status/${course._id}`);
      // alert(course._id);
      // console.log("data ", data);
      setEnrollStatus(data);
    } catch (err) {
      toast(" Enroll Status fail");
    }
  };

  //

  const handlePaidCourse = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        router.push("/login");
        return;
      }
      // enrollStatus.status;
      if (enrollStatus.status) {
        return router.push(`/user/course/${enrollStatus.course.slug}`);
      }

      // console.log("handle Paid Course again");
      // const { data } = await axios.post(`/api/sssssss`)
      const { data } = await axios.post(`/api/paid-enroll/${course._id}`);
      data && setCourses(data.course);
      // console.log(courses);
      toast("Congratulation you have successfully enroll in this course");
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      toast("Handle Paid Course Fails");
    }
  };

  //

  const handleFreeCourse = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        router.push("/login");
        return;
      }
      if (enrollStatus.status) {
        return router.push(`/user/course/${enrollStatus.course.slug}`);
      }

      // console.log("handle Free Course", course._id);
      const { data } = await axios.post(`/api/free-enroll/${course._id}`);
      // console.log(data);
      toast("Congratulation you have successfully enroll in this course");
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      toast("Handle Free Course Fail");
    }
  };
  //

  //

  //

  useEffect(
    (e) => {
      if (user && course) getEnrollStatus();
    },
    [user, course]
  );

  //

  //
  return (
    <>
      {/* {JSON.stringify(courses, null, 4)} */}
      <>
        <div className="media p-3  ant-jumbotron bg-primary text-white row">
          <div className="col-md-8">
            <h1 className="text-white">{course.name}</h1>
            <p>{course.description.substring(0, 170)}</p>
            <p>
              <Badge
                style={{ backgroundColor: "blue" }}
                count={course.category}
              />
            </p>
            <p>Created by {course.instructor.name}</p>
            <p>
              Last updated {new Date(course.updatedAt).toLocaleDateString()}
            </p>
            <p>
              {course.paid
                ? CurrencyFormatter({ currency: "usd", amount: course.price })
                : "Free"}
            </p>
          </div>
          <div className="col-md-4">
            <div
              onClick={(p) => {
                setPreview(
                  course.lesson[0].video && course.lesson[0].video.Location
                );
                setShowModal(course.lesson[0].video && !showModal);
              }}
            >
              {course.lesson && (
                <>
                  {course.lesson[0].video ? (
                    <>
                      <ReactPlayer
                        light={course.image.Location}
                        url={
                          course.lesson[0].video &&
                          course.lesson[0].video.Location
                        }
                        className="react-player-div"
                        height="200px"
                        width="100%"
                        // controls
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={course.image.Location}
                        alt={course.name}
                        height="280px"
                        width="100%"
                      />
                    </>
                  )}
                </>
              )}{" "}
            </div>
            <div className="d-flex justify-content-center mt-2">
              <Button
                icon={<CarryOutOutlined />}
                size="large"
                className="bg-danger text-white"
                block
                shape="round"
                onClick={course.paid ? handlePaidCourse : handleFreeCourse}
              >
                {user
                  ? enrollStatus.status
                    ? "Go to course"
                    : "Enroll"
                  : "Login to Enroll"}
              </Button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
export default SingleCourseCard;

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CourseCard from "../component/cards/courseCard";

import axios from "axios";

import { Badge } from "antd";

//
const home = () => {
 
  const [courses, setCourses] = useState();


  // //
  const getPublishedCourses = async (e) => {
    try {
      const { data } = await axios.get("/api/course");
      setCourses(data);
    } catch (err) {
      console.log(err);
      toast("Get All Published  courses error");
    }
  };

  // //

  useEffect((l) => {
    // console.log("courses", courses);
    getPublishedCourses();
  }, []);


  //
  return (
    //
    <>
      {/* <>{courses[1].name}</> */}
      <div className="container-fluid">
        <h1 className="jumbotron bg-primary">Online Education Marketplace</h1>
        <div className="bg-blacky p-2 ">
          {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}
          <div className="row">
            {courses &&
              courses.map((course) => (
                <div key={course._id} className="col-md-4 mb-2 mt-2">
                  <CourseCard course={course} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${process.env.API}/course`);
  return {
    props: { coursez: data },
  };
};

// console
export default home;

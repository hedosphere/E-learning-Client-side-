//
import axios from "axios";
import SingleCourseCard from "../../component/cards/SinglecourseCard";
import PreviewModal from "../../component/modals/PreviewModal";
import SingleLessonCard from "../../component/cards/SingleLessonCard";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// var slugUniverse = "";
//
const CourseDetails = () => {
  const router = useRouter();
  const [course, setCourse] = useState();
  const [preview, setPreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState({});

  const { slug } = router.query;

  useEffect((p) => {
    const fetchCourse = async () => {
      const { data } = await axios.get(`/api/course/${slug}`);
      setCourse(data);
    };

    fetchCourse();
  }, []);

  //
  return (
    <>
      {course && (
        <div className="container-fluid">
          <SingleCourseCard
            preview={preview}
            setPreview={setPreview}
            setShowModal={setShowModal}
            course={course}
            showModal={showModal}
            enrollStatus={enrollStatus}
            setEnrollStatus={setEnrollStatus}
            loading={loading}
            setLoading={setLoading}
          />

          <div className="div">
            <PreviewModal
              setShowModal={setShowModal}
              showModal={showModal}
              setPreview={setPreview}
              preview={preview}
              lesson={course.lesson}
              course={course}
            />
          </div>
          <div className="m-2">
            {course.lesson && (
              <>
                <h3 className="bg-white">
                  {course.lesson.length} Lessons
                  <hr />
                </h3>
                <SingleLessonCard
                  setShowModal={setShowModal}
                  showModal={showModal}
                  setPreview={setPreview}
                  preview={preview}
                  lesson={course.lesson}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { data } = await axios.get(
    `${process.env.API}/course/${context.query.slug}`
  );
  //   console.log(data.price);
  return {
    props: { course: data },
  };
};

export default CourseDetails;

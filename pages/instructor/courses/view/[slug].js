//
import InstructorNav from "../../../../component/route/requireinstructor";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  QuestionOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import AddLesson from "../../../../component/forms/addlessonF";

// import ReactMarkDown from "react-markdown";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
//

//

// main function
const Slug = (p) => {
  // state
  const [course, setCourse] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadText, setUploadText] = useState("");
  const [values, setValues] = useState({ title: "", video: {}, content: "" });

  // router
  const router = useRouter();

  const { slug } = router.query;

  const HandleRemoveVideo = async (p) => {
    //
    p.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `/api/course/remove-video/${course.instructor._id}`,
        {
          object: values.video,
        }
      );
      setProgress(0);
      setValues({ ...values, video: {} });
      setUploadText("");
      setLoading(false);
      toast("Video Removed");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast("Video Remove Error");
    }
  };
  const handleVideo = async (p) => {
    setLoading(true);

    try {
      // console.log("handleVideo");
      const file = p.target.files[0];
      setUploadText(file.name);

      const videoData = new FormData();

      videoData.append("video", file);
      const { data } = await axios.post(
        `/api/course/upload-video/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
            // console.log(e.loaded);
          },
        }
      );
      // const { data } = await axios.post("/api/course/upload-video");

      // console.log(data);
      setValues({ ...values, video: data });
      //
      if (data) setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const onCancelModal = async (p) => {
    setVisible(false);
    // setUploadText("");
    // setValues({ ...values, title: "", content: "" });
  };
  const addLesson = async (p) => {
    //
    p.preventDefault();
    setLoading(true);
    try {
      // console.log(course.instructor._id);
      const { data } = await axios.post(
        // `/api/course/addlesson`,
        `/api/course/addlesson/${slug}/${course.instructor._id}`,
        values
      );

      {
        /* values, loading, setLoading, setValues, HandleRemoveVideo,
            addLesson, progress, setProgress, handleVideo, uploadText, handleVideo
            setUploadText setVisible  setCourse
             title: "",
    video: {},
    content: "",
            */
      }
      // console.log(data);
      setCourse(data);
      if (data) {
        setVisible(false);
        setValues({ ...values, title: "", video: {}, content: "" });
        setProgress(0);
        setLoading(false);
        setUploadText("");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const fetchCourse = async (p) => {
    //
    const { data } = await axios.get(`/api/course/${slug}`);

    setCourse(data);
  };

  useEffect(
    (p) => {
      fetchCourse();
    },
    [slug]
  );

  //

  //

  const handlePublish = async (e, courseID) => {
    e.preventDefault();

    try {
      let answer = window.confirm(
        "Once you publish, your course will be live in the market place!"
      );
      if (!answer) return;

      const { data } = await axios.put(`/api/course/publish/${courseID}`);

      //

      if (data) {
        setCourse(data);
        toast("Congrate your course is live");
      }
      //
    } catch (err) {
      toast("Course publish fail");
    }
  };

  //

  //

  const handleUnpublish = async (e, courseID) => {
    e.preventDefault();
    try {
      let answer = window.confirm(
        "Once you unpublish, your course will not be live in the market place!"
      );
      if (!answer) return;

      const { data } = await axios.put(`/api/course/unpublish/${courseID}`);
      if (data) {
        setCourse(data);

        toast("You course is unpublished");
      }
    } catch (err) {
      toast("Course publish fail");
    }
  };

  //

  //

  return (
    <InstructorNav>
      <>
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className="container-fluid mt-2">
            <div className=" row media ml-2">
              <div className="ant-col-xs-2">
                <Avatar
                  size={100}
                  src={
                    course.image
                      ? course.image.Location
                      : "/pictures/avatar.png"
                  }
                  alt={course.name}
                />
              </div>
              <div className=" media-body col mt-2">
                <h4 className="text-primary">{course.name}</h4>
                <p style={{ marginTop: "-4px" }}>
                  <b>{course.lesson.length} Lessons</b>
                </p>
                <p style={{ marginTop: "-10px" }}>{course.category}</p>
              </div>
              <div className="ant-col-xs-2 mt-4 d-flex">
                <Tooltip
                  onClick={(p) =>
                    router.push(`/instructor/courses/edit/${slug}`)
                  }
                  className="pointer h5 me-4 text-warning"
                  title="Edit"
                >
                  <EditOutlined />
                </Tooltip>

                {course.lesson && course.lesson.length < 5 ? (
                  <Tooltip
                    className="pointer h5 text-danger"
                    title="At least 5 lessons is required to publish a course"
                  >
                    <QuestionOutlined />
                  </Tooltip>
                ) : course.published ? (
                  <>
                    <Tooltip
                      onClick={(e) => handleUnpublish(e, course._id)}
                      className="pointer h5 text-danger"
                      title="Unpublish"
                    >
                      <CloseOutlined />
                    </Tooltip>
                  </>
                ) : (
                  <Tooltip
                    onClick={(e) => handlePublish(e, course._id)}
                    className="pointer h5 text-success"
                    title="Publish"
                  >
                    <CheckOutlined />
                  </Tooltip>
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                {course && <ReactMarkdown children={course.description} />}
              </div>
            </div>
            <br />
            <div className="row">
              <div className=" justify-content-center">
                <Button
                  className="col-sm-6 offset-sm-3"
                  shape="round"
                  type="primary"
                  size="large"
                  icon={<UploadOutlined />}
                  onClick={() => setVisible(true)}
                >
                  Add Lesson
                </Button>
              </div>
              <div>
                <Modal
                  visible={visible}
                  centered
                  footer={null}
                  title="+ Add Lesson"
                  onCancel={() => onCancelModal()}
                >
                  <AddLesson
                    addLesson={addLesson}
                    handleVideo={handleVideo}
                    uploadText={uploadText}
                    setUploadText={setUploadText}
                    loading={loading}
                    setLoading={setLoading}
                    values={values}
                    progress={progress}
                    HandleRemoveVideo={HandleRemoveVideo}
                    setProgress={setProgress}
                    setValues={setValues}
                  />
                </Modal>
                {/* <br /> */}
                {course && course.lesson.length > 0 && (
                  <>
                    <hr />
                    <div className="row">
                      <div className="col">
                        <h4>
                          {course && course.lesson && course.lesson.length}{" "}
                          Lessons
                        </h4>

                        <List
                          itemLayout="horizontal"
                          dataSource={course && course.lesson}
                          renderItem={(item, index) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Avatar>{index + 1}</Avatar>}
                                title={item.title}
                              />
                            </List.Item>
                          )}
                        />
                      </div>
                    </div>
                  </>
                )}
                <br />
                <br />
                <br />
                <br />
                <br />
                {/* {JSON.stringify(course, null, 4)} */}
              </div>
            </div>
          </div>
        )}
      </>
    </InstructorNav>
  );
};

export default Slug;

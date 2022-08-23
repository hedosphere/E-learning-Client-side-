//
import Resizer from "react-image-file-resizer";
//
import FormControl from "../../../../component/forms/courseCreateF";
import { useState, useEffect } from "react";
import RequireInstructor from "../../../../component/route/requireinstructor";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { List, Avatar, Layout, Tooltip, Modal } from "antd";
import Link from "next/link";
import { DeleteOutlined } from "@ant-design/icons";
import EditLesson from "../../../../component/forms/editLesson";

//
// handleEditLesson
const { Content } = Layout;

const createCourse = () => {
  const route = useRouter();
  //   ,  //   ,
  // const [loading, setLoading] = useState(false);
  const [draggAble, setDraggAble] = useState(false);
  const [draggAbleName, setDraggAbleName] = useState("Rearrange");
  const [progress, setProgress] = useState(0);
  const [uploadText, setuploadText] = useState("");

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState({});
  const [image, setImage] = useState();
  const [courseSlug, setCourseSlug] = useState("");
  const [instructor, setInstructor] = useState("");
  const [values, setValues] = useState({
    name: "",
    description: "",
    // free_preview: true,
    category: "",
    paid: true,
    price: 9.99,
    uploading: false,
    imagePreview: "",
    imageName: "Upload Image",
    lesson: [],
  });

  const { slug } = route.query;
  //
  useEffect(
    (e) => {
      getCourse();
    },

    [slug]
  );

  const getCourse = async (e) => {
    if (slug) {
      const { data } = await axios.get(`/api/course/${slug}`);
      console.log("getCourse", data.instructor);
      setImage(data.image);
      setCourseSlug(data.slug);
      // progress
      setInstructor(data.instructor);
      setValues({
        ...values,
        paid: data.paid,
        free_preview: data.free_preview,
        price: data.price,
        imageName: data.image.Key,
        imagePreview: data.image.Location,
        name: data.name,
        description: data.description,
        category: data.category,
        lesson: data.lesson,
      });
    }
    // setCourse(data); HandleRemoveVideo
  };
  const handleRemoveImage = async (e) => {
    //
    e.preventDefault();
    // alert("image remove");
    // return;
    try {
      setLoading(true);
      //
      //
      const { data } = await axios.post("/api/course/remove-image", {
        object: image,
      });
      setImage({});
      setValues({ ...values, imageName: "Upload Image", imagePreview: "" });
      setLoading(false);
      toast("Image Removed ");
    } catch (err) {
      setLoading(false);

      toast.error("Remove Image Error");
    }
  };
  //

  //
  const handleImage = (e) => {
    e.preventDefault();
    try {
      // setLoading(false);
      setLoading(true);

      let img = e.target.files[0];
      setValues({
        ...values,
        imagePreview: window.URL.createObjectURL(img),
        imageName: img.name,
      });
      Resizer.imageFileResizer(
        img, // file, // Is the file of the image which will resized.
        720, // maxWidth, // Is the maxWidth of the resized new image.,
        500, // maxHeight, // Is the maxHeight of the resized new image.
        "jpeg", // compressFormat, // Is the compressFormat of the resized new image.
        100, // quality, // Is the quality of the resized new image.
        0, // rotation, // Is the degree of clockwise rotation to apply to uploaded image.
        // responseUriFunc, // Is the callBack function of the resized new image URI.
        // outputType, // Is the output type of the resized new image.
        // minWidth, // Is the minWidth of the resized new image.
        // minHeight, // Is the minHeight of the resized new image.
        async (uri) => {
          //
          // console.log(uri.name);
          let { data } = await axios.post("/api/course/upload-image", {
            image: uri,
          });

          setImage(data);
          if (data) setLoading(false);
          console.log(data);
        }
      );
      // if (data) setLoading(false);

      toast("image ok");
    } catch (err) {
      toast("erro with image");
      // setValues({ ...values, loading: false });
      console.log(err);
      setLoading(false);
    }
  };

  //
  const handleValues = (p) => {
    setValues({ ...values, [p.target.name]: p.target.value });
  };

  //
  const handleSubmit = async (p) => {
    p.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.put(`/api/course/edit/${slug}`, {
        ...values,
        image,
      });
      //   console.log(data);
      setLoading(false);
      toast("Greate!, Now you can contineu adding more course");
      route.push(`/instructor/courses/view/${data.slug}`);
      //   /courses/view/advance-java-tutorial
    } catch (err) {
      console.log(err);
      toast(err.response.data);
      setLoading(false);
    }
  };
  const handleDrag = async (e, index) => {
    e.dataTransfer.setData("movinIndex", index);
  };
  const handleDrop = async (e, index) => {
    const targetIndex = index;
    const movingIndex = e.dataTransfer.getData("movinIndex");

    let allLessons = values.lesson;

    const movingItem = allLessons[movingIndex];

    allLessons.splice(movingIndex, 1);
    allLessons.splice(targetIndex, 0, movingItem);

    setValues({ ...values, lesson: allLessons });
  };
  // handleEditLesson;

  const handleDelete = async (index) => {
    try {
      const allLessons = values.lesson;
      const remove = allLessons[index];
      // console.log(remove.video);
      // return;

      const answer = window.confirm("Delete Lesson '" + remove.title + "'?");
      if (!answer) return;

      if (!remove.video) {
        // toast("Lesson video not found");
      } else {
        // toast("Lesson video  found");

        const { data } = await axios.post(
          `/api/course/remove-video/${instructor._id}`,
          { object: remove.video }
        );
      }
      allLessons.splice(index, 1);
      setValues({ ...values, lesson: allLessons });

      const { data } = await axios.put(
        `/api/lesson/removelesson/${slug}/${remove._id}/${courseSlug}`
      );
      toast("Lesson Deleted");
    } catch (err) {
      toast("Lesson Delete error");
    }
  };
  const handleRearange = async (index) => {
    const { data } = await axios.put(`/api/course/edit/${slug}`, {
      ...values,
      image,
    });
    setDraggAble(false);
    setDraggAbleName("Toggle Rearrange");
    toast.success("Lesson Rearranged");
  };
  const HandleRemoveVideo = async () => {
    // handleVideo
  };

  const handleVideo = async (p) => {
    //
    // console.log(lessons.video.Key);   "/course/remove-video/:instructorId", instructor
    setLoading(true);
    try {
      if (lessons.video && lessons.video.Location) {
        const videoDelt = await axios.post(
          // "/course/remove-video/:instructorId"
          `/api/course/remove-video/${instructor._id}`,
          { object: lessons.video }
        );
      }

      const file = p.target.files[0];
      let videoData = new FormData();

      videoData.append("video", file);

      setuploadText(file.name);
      const { data } = await axios.post(
        `/api/course/upload-video/${instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) =>
            // set
            setProgress(Math.round((100 * e.loaded) / e.total)),
        }
      );
      if (data) {
        console.log(data);
        setLessons({ ...lessons, video: data });
        setLoading(false);
      }
    } catch (err) {
      toast("video error");
      setLoading(false);
      console.log(err);
    }
  };
  const handtoGleleRearange = async (e) => {
    e.preventDefault();
    setDraggAble(!draggAble);

    setDraggAbleName("Toggle Rearrange");
  };
  const handleModal = async (index) => {
    const lesson = values.lesson[index];
    // console.log(lesson);
    setLessons(lesson);
    setVisible(true);
    if (lesson.video) setuploadText(lesson.video.Key);
  };

  const handleEditLesson = async (e) => {
    //
    e.preventDefault();

    // console.log(lessons);
    setLoading(true);
    try {
      // "/lesson/update/:slug/:instructorID",

      const { data } = await axios.put(
        `/api/lesson/update/${courseSlug}`,
        lessons
      );
      if (data.ok) {
        // setValues(data);

        const arr = values.lesson;

        let index = arr.findIndex((i) => i._id === lessons._id);

        // const [visible, setVisible] = useState(false);
        // const [lessons, setLessons] = useState({});

        arr[index] = lessons;
        setValues({ ...values, lesson: arr });

        setLessons({});
        setLoading(false);
        toast("Update lesson ");
        setVisible(false);
      }
    } catch (err) {
      setLoading(false);
      toast("Update lesson fail");
    }
  };
  return (
    <>
      {/* <Layout> */}
      <RequireInstructor>
        <h1 className="jumbotron bg-danger"> Edit Course</h1>
        <div className="p-1">
          {
            <FormControl
              handleSubmit={handleSubmit}
              handleRemoveImage={handleRemoveImage}
              values={values}
              handleImage={handleImage}
              loading={loading}
              setLoading={setLoading}
              setValues={setValues}
              handleValues={handleValues}
            />
          }
        </div>
        {/* <pre>{JSON.stringify(course, null, 4)} </pre>
        <hr />
    */}
        {/* <pre>{JSON.stringify(values, null, 4)} </pre> */}
        <br />
        {/* <hr /> */}
        <div className="row container-fluid ">
          {" "}
          <div className="col ">
            <h4 className="p-2">
              <span className="p-2">
                {values && values.lesson && values.lesson.length} Lessons
              </span>
              <span
                onClick={handtoGleleRearange}
                className="btn btn-primary m-2"
              >
                {draggAbleName}
              </span>
            </h4>
            <hr />
            <List
              // className=""
              onDragOver={(e) => e.preventDefault()}
              itemLayout="horizontal"
              dataSource={values && values.lesson}
              renderItem={(item, index) => (
                // <Content>
                <div className=" row d-flex ">
                  <div className="col">
                    <List.Item
                      key={item._id}
                      draggable={draggAble}
                      onDragStart={(e) => handleDrag(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <List.Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                        onClick={() => handleModal(index)}
                      ></List.Item.Meta>
                    </List.Item>
                  </div>
                  <div className="ant-col-xs-2">
                    {/* <div className="ant-col-xs-2"> */}
                    <div className="text-danger d-lex">
                      <Tooltip title="Delete">
                        <DeleteOutlined
                          className="me-2 "
                          onClick={(p) => handleDelete(index)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                  <hr />
                </div>
                // </Content>
              )}
            />
            <div className="row">
              <div className="l ">
                <button
                  onClick={handleRearange}
                  style={{ float: "right" }}
                  className="btn btn-success float-right"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Modal
                  centered
                  visible={visible}
                  title="Edit Lessons"
                  onCancel={(p) => {
                    setLessons({});
                    setVisible(false);
                    setuploadText("");
                  }}
                  footer={false}
                >
                  <EditLesson
                    setLessons={setLessons}
                    handleEditLesson={handleEditLesson}
                    loading={loading}
                    progress={progress}
                    setProgress={setProgress}
                    lessons={lessons}
                    handleVideo={handleVideo}
                    setuploadText={setuploadText}
                    HandleRemoveVideo={HandleRemoveVideo}
                    uploadText={uploadText}
                    values={values}
                    setValues={setValues}
                  />
                </Modal>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />{" "}
          </div>
        </div>
      </RequireInstructor>
      {/* </Layout> */}
    </>
  );
};

export default createCourse;

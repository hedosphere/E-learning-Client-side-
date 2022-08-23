import { useRouter } from "next/router";
import { useState, useEffect, createElement } from "react";
import StudentRoute from "../../../component/route/StudentRoute";
import axios from "axios";
import ReactPlayer from "react-player";
import { Avatar, Menu, Button } from "antd";
import ReactMarkdown from "react-markdown";
import {
  SyncOutlined,
  PlayCircleFilled,
  CarryOutOutlined,
  FileMarkdownOutlined,
  DatabaseTwoTone,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
const courseSlug = () => {
  //

  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState();
  const [itemz, setitemz] = useState(-1);
  const [navKey, setNavKey] = useState("");
  const [collapse, setcollapse] = useState(false);
  const [complete, setComplete] = useState(false);
  const [listComplete, setListComplete] = useState([]);
  //

  //

  const route = useRouter();
  const { slug } = route.query;
  const fetchCourse = async (e) => {
    // console.log("fetchCourse enrole");
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/single-course/${slug}`);
      setCourse(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log("err");
    }
  };

  //
  const getlistCompleted = async (e) => {
    // console.log("list cvompleted");
    try {
      const { data } = await axios.post("/api/list-completed", {
        courseId: course._id,
      });
      setListComplete(data);
      // console.log(listComplete);
    } catch (err) {
      // console.log(err); markInCompleted
    }
  };
  //

  const markInCompleted = async () => {
    const { data } = await axios.post("/api/mark-incompleted", {
      courseId: course._id,
      lessonId: course.lesson[itemz]._id,
    });

    if (data) {
      let oldList = listComplete;
      let index = oldList.findIndex((i) => i === course.lesson[itemz]._id);
      // console.log(index);
      oldList.splice(index, 1);
      setListComplete(oldList);
      setComplete(!complete);
      // console.log(listComplete);
    }
    // console.log(listComplete);
  };
  //

  //
  const markCompleted = async () => {
    try {
      const { data } = await axios.post("/api/mark-completed", {
        courseId: course._id,
        lessonId: course.lesson[itemz]._id,
      });
      // console.log(data); listComplete setListComplete
      if (data) {
        //
        let oldList = listComplete;
        let length = oldList.length;
        oldList.splice(length, 0, course.lesson[itemz]._id);

        setListComplete(oldList);
        setComplete(!complete);
        // console.log(listComplete);
      }
    } catch (err) {
      // console.log(err);
    }
  };
  //

  useEffect(
    (e) => {
      fetchCourse();
    },

    [slug]
  );
  useEffect(
    (e) => {
      getlistCompleted();
    },
    [course]
  );
  // label, key, icon, children, type;

  const itemList =
    course &&
    course.lesson.map((item, index) => {
      // let title = item.title.substring(0, 26).toUpperCase();
      return {
        label: item.title.substring(0, 26).toUpperCase(),
        // label: title + createElement(FileMarkdownOutlined),
        title: `${item.title.toUpperCase()} ${
          listComplete.includes(item._id) ? "Is Completed" : ""
        }`,
        // key: index,
        className: `${listComplete.includes(item._id) && "markcompleted"}`,
        key: item._id,
        onClick: () => {
          // console.log(itemz);
          setitemz(index);
          setNavKey(item._id);
        },
        icon: <Avatar>{index + 1} </Avatar>,
      };
    });

  return (
    <StudentRoute>
      {loading ? (
        <>
          <div className="d-flex justify-content-center">
            <SyncOutlined spin className="text-danger display-1  " />
          </div>
        </>
      ) : (
        <>
          <div className="row p-1">
            <div
              style={{ marginTop: "-1.6px", maxWidth: "20vw" }}
              className={`${!collapse ? "col" : "col-sm-1"}`}
            >
              <Button
                onClick={(e) => setcollapse(!collapse)}
                className="btn ant-btn-block text-primary mt-1 mb-2"
              >
                {collapse ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                {!collapse && "Lessons"}
                {/* {createElement(
                  collapse ? MenuFoldOutlined : MenuUnfoldOutlined
                )} */}
              </Button>
              <Menu
                inlineCollapsed={collapse}
                items={itemList}
                selectedKeys={navKey}
                mode="inline"
                // theme="dark"
                style={{
                  // marginLeft: "-40",
                  minHeight: "85vh",
                }}
              />
            </div>

            <div className="col">
              {itemz > -1 && (
                <div className="col alert alert-primary">
                  <b>
                    {course &&
                      course.lesson[itemz].title.substring(0, 50).toUpperCase()}
                  </b>

                  <span
                    className="pointer "
                    onClick={(p) => {
                      !listComplete.includes(course.lesson[itemz]._id)
                        ? markCompleted()
                        : markInCompleted();
                      // setComplete(!complete);
                    }}
                    style={{ float: "right" }}
                  >
                    {!listComplete.includes(course.lesson[itemz]._id) ? (
                      <span className="text-primary"> Mark as complete </span>
                    ) : (
                      <span className="text-danger"> Mark as incomplete </span>
                    )}
                  </span>
                </div>
              )}
              {/* {itemz} */}
              {/* {course && <pre>{JSON.stringify(course, null, 4)}</pre>} */}
              {itemz < 0 ? (
                <>
                  <div className="d-flex justify-content-center">
                    <PlayCircleFilled
                      className=" text-secondary"
                      style={{ fontSize: "200px" }}
                    />
                  </div>
                  <h5 className="text-center">
                    click on the left side nav to start a lesson
                  </h5>
                </>
              ) : (
                <div>
                  <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    url={
                      course.lesson[itemz].video &&
                      course.lesson[itemz].video.Location
                    }
                  />
                  <div className="mt-3 p-2">
                    <ReactMarkdown children={course && course.description} />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* </div> */}
        </>
      )}
    </StudentRoute>
  );
};

export default courseSlug;

//
import { Button, Progress, Tooltip, Switch } from "antd";

import { CloseCircleFilled } from "@ant-design/icons";
import ReactPlayer from "react-player";
// react - player;
//

//

const EditLesson = ({
  setLessons,
  lessons,
  loading,
  uploadText,
  setUploadText,

  values,
  setValues,
  // setLoading,
  HandleRemoveVideo,
  handleEditLesson,

  progress,
  setProgress,
  handleVideo,
}) => {
  //

  //

  //
  const handlePreview = async (p) => {
    console.log("free preview");
  };

  return (
    <>
      <>
        {/* {JSON.stringify(lessons)} */}
        {/* {lessons.free_preview ? "true" : "false"} */}

        <br />
        <form onSubmit={handleEditLesson}>
          <br />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Title"
            value={lessons.title}
            onChange={(e) => setLessons({ ...lessons, title: e.target.value })}
          />
          <textarea
            value={lessons.content}
            onChange={(e) =>
              setLessons({ ...lessons, content: e.target.value })
            }
            className="form-control mb-3"
            rows="5"
          ></textarea>
          <div className="d-flex justify-content-center">
            <label className="btn me-2 btn-outline-secondary form-control mb-1098">
              {uploadText ? uploadText : "Upload Video"}
              <input
                disabled={loading}
                type="file"
                accept="video/*"
                onChange={handleVideo}
                hidden
              />
            </label>
            {/* lessons, loading, setLoading, setLessons, HandleRemoveVideo,
            handleEditLesson, progress, setProgress, handleVideo, uploadText, handleVideo
            setUploadText */}
          </div>
          {progress > 0 && (
            <Progress
              className="d-flex mt-2 justify-content-center pb-2"
              steps={10}
              percent={progress}
            />
          )}
          {/* <div className="container"> */}
          {lessons && lessons.video && (
            <ReactPlayer
              url={lessons.video.Location}
              className="p-1 "
              // height={"70px"}
              controls={true}
              width={"100%"}
            />
          )}
          {/* </div> */}
          <div className="row">
            <div className="col">
              Preview
              <Switch
                // checkedChildren="No Preview"
                className="float-right"
                style={{ float: "right" }}
                disabled={loading}
                // unCheckedChildren="Preview"
                onChange={(p) =>
                  setLessons({
                    ...lessons,
                    free_preview: p,
                    // free_preview: !lessons.free_preview,
                  })
                }
                checked={lessons.free_preview}
              />
            </div>
          </div>
          <Button
            className="mb-3 mt-2 text-center col-sm-12"
            shape="round"
            size="large"
            type="primary"
            disabled={loading}
            onClick={handleEditLesson}
          >
            Save
          </Button>
        </form>
      </>
    </>
  );
};

export default EditLesson; // handleEditLesson;

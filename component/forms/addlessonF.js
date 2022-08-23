//
import { Button, Progress, Tooltip } from "antd";

import { CloseCircleFilled } from "@ant-design/icons";
//

//

const addLesson = ({
  values,
  uploadText,
  setUploadText,
  loading,
  setLoading,
  setValues,
  HandleRemoveVideo,
  addLesson,

  progress,
  setProgress,
  handleVideo,
}) => {
  //

  //

  //

  return (
    <>
      <>
        <form onSubmit={addLesson}>
          <br />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
          <textarea
            value={values.content}
            onChange={(e) => setValues({ ...values, content: e.target.value })}
            className="form-control mb-3"
            rows="5"
          ></textarea>
          <div className="d-flex justify-content-center">
            <label className="btn me-2 btn-outline-secondary form-control mb-3">
              {uploadText ? uploadText : "Upload Video"}
              <input
                disabled={loading || uploadText}
                type="file"
                accept="video/*"
                onChange={handleVideo}
                hidden
              />
            </label>
            {/* values, loading, setLoading, setValues, HandleRemoveVideo,
            addLesson, progress, setProgress, handleVideo, uploadText, handleVideo
            setUploadText */}
            {!loading ? (
              uploadText && (
                <Tooltip
                  onClick={HandleRemoveVideo}
                  className="text-danger pt-1 pl-4"
                  disabled={loading}
                  title="Remove"
                >
                  <CloseCircleFilled className="d-flex justify-content-center mt-2 pointer" />
                </Tooltip>
              )
            ) : (
              <></>
            )}
          </div>

          {progress > 0 && (
            <Progress
              className="d-flex justify-content-center pb-2"
              steps={10}
              percent={progress}
            />
          )}
          <Button
            className="mb-3 text-center col-sm-12"
            shape="round"
            size="large"
            type="primary"
            disabled={loading}
            onClick={addLesson}
          >
            Save
          </Button>
        </form>
      </>
    </>
  );
};

export default addLesson;

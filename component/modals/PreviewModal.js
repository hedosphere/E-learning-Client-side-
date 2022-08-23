import { Modal } from "antd";
import ReactPlayer from "react-player";
import { Avatar, List } from "antd";

//

const { Item } = List;

const PreviewModal = ({
  preview,
  lesson,
  setShowModal,
  course,
  showModal,
  setPreview,
}) => {
  return (
    <>
      <>
        <Modal
          footer={false}
          width="650px"
          title="Course Preview"
          onCancel={(p) => {
            setPreview(null);
            setShowModal(!showModal);
          }}
          visible={showModal}
        >
          <ReactPlayer pause={!preview} width="100%" controls url={preview} />

          <hr />
          {/* {lesson && lesson.free_preview && lesson.video && <>free lesson</>} */}

          <List
            itemLayout="horizontal"
            dataSource={lesson}
            renderItem={(item, index) =>
              item.free_preview &&
              item.video && (
                <List.Item
                  style={{ cursor: "pointer" }}
                  className="text-primary d-flex mr-2 pointer ant-pointer"
                  onClick={(p) => {
                    setShowModal(true);
                    setPreview(item.video.Location);
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar>
                        <b>-</b>
                      </Avatar>
                    }
                    title={
                      <ReactPlayer
                        height="40px"
                        width="40px"
                        url={item.video.Location}
                      />
                    }
                  />

                  <div>{item.title}</div>
                </List.Item>
              )
            }
          ></List>
        </Modal>
      </>
    </>
  );
};

export default PreviewModal;

//
import { Avatar, List } from "antd";

//

const { Item } = List;

//
const SingleLessonCard = ({
  lesson,
  setPreview,
  preview,
  setShowModal,
  showModal,
}) => {
  //
  return (
    <>
      {/* {JSON.stringify(lesson, null, 4)} */}
      <>
        <List
          itemLayout="horizontal"
          dataSource={lesson}
          renderItem={(item, index) => (
            <List.Item className="d-flex mr-2">
              <List.Item.Meta
                avatar={<Avatar>{index + 1}</Avatar>}
                title={item.title}
              />

              {item.free_preview && item.video && (
                <div
                  style={{ cursor: "pointer" }}
                  className="text-primary pointer ant-pointer"
                  onClick={(p) => {
                    setShowModal(!showModal);
                    // alert(item.video.Location);
                    setPreview(item.video.Location);
                  }}
                >
                  Preview
                </div>
              )}
            </List.Item>
          )}
        ></List>
      </>
    </>
  );
};

export default SingleLessonCard;

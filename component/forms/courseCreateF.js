//
import { Avatar, Badge, Select } from "antd";

//

//
const { Option } = Select;

//

const createCourses = ({
  handleSubmit,
  handleImage,
  handleRemoveImage,
  values,
  loading,
  setLoading,
  setValues,
  handleValues,
}) => {
  //
  //
  let priceses = [];
  for (let i = 9.99; i <= 100.99; i++) {
    priceses.push(
      <Option key={i.toFixed(2)} value={i.toFixed(2)}>
        N {i.toFixed(2)}{" "}
      </Option>
    );
  }
  //

  //
  return (
    <>
      <form onSubmit={handleSubmit} className="container ">
        <input
          type="text"
          name="name"
          value={values.name}
          className="form-control mb-2"
          onChange={handleValues}
          placeholder="Name"
        />

        <textarea
          name="description"
          value={values.description}
          placeholder="Description"
          onChange={handleValues}
          className="form-control mb-2"
          rows="8"
        ></textarea>
        <div className="row">
          <div className=" form-group">
            <div className="col-sm-12 mb-2">
              <Select
                onChange={(p) => setValues({ ...values, paid: p, price: 0 })}
                style={values.paid ? { width: "79.1%" } : { width: "100%" }}
                className="me-1 "
                value={values.paid}
                size={"large"}
              >
                <Option key={"Paid"} value={true}>
                  Paid
                </Option>
                <Option key={"Free"} value={false}>
                  Free
                </Option>
              </Select>
              {values.paid && (
                <Select
                  style={{ width: "20%" }}
                  value={"N " + values.price}
                  size={"large"}
                  onChange={(p) => setValues({ ...values, price: p })}
                  className="v"
                >
                  {priceses}
                </Select>
              )}
            </div>
          </div>

          <div className="form-group mb-2">
            <input
              type="text"
              name="category"
              className=" form-control  "
              onChange={handleValues}
              value={values.category}
              placeholder="Category"
            />
          </div>
        </div>
        <div className="row form-row">
          <div className="col  ">
            <label
              style={{ width: "100%" }}
              className="btn form-control  btn-outline-secondary  "
            >
              <input
                type="file"
                onChange={handleImage}
                accept="image/*"
                hidden={true}
                disabled={loading || values.imagePreview}
              />
              {values.imageName}
            </label>
          </div>
          {values.imagePreview && (
            <div className="ant-col-xs-1 mb-2">
              <Badge count="X" onClick={handleRemoveImage}>
                <Avatar shape="circle " size={45} src={values.imagePreview} />
              </Badge>
            </div>
          )}
        </div>

        {/* kkkkk category */}

        {/* jjjjjjj */}

        <button
          disabled={loading}
          className="btn mt-2 btn-success"
          type="submit"
        >
          Save & Continue
        </button>
      </form>
      {/* lklklklklklklk */}
      {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
    </>
  );
};
export default createCourses;

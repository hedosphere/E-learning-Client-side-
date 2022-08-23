import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useContext } from "react";

import { Context } from "../../context";

const paycallback = (p) => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(
    (p) => {
      //
      axios
        .post("/api/callback")
        .then((item) => {
          // console.log(item.data);
          window.localStorage.setItem("user", JSON.stringify(item.data));
          dispatch({ type: "LOGIN", payload: item.data });
          window.location.href = "/instructor";
        })
        .catch((p) => {
          console.log("callback error");
        });
    },

    []
  );
  return (
    <>
      <>
        <h1 className="jumbotron bg-primary">
          {" "}
          Completing Payment Setup please wait...{" "}
        </h1>
        <div className="d-flex container justify-content-center bg-success col-md-6 offset-md-3 p-4">
          <SyncOutlined spin className="display-1 text-danger" />
        </div>
        {/* <h1>call back</h1> */}
      </>
    </>
  );
};

export default paycallback;

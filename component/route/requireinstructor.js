import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { SyncOutlined } from "@ant-design/icons";
import Instructornav from "../nav/instructornav";

const requireInstructor = ({ children }) => {
  const [ok, setOk] = useState(false);

  const getCurrentInstructor = async () => {
    try {
      const { data } = await axios.post("/api/current-instructor");
      if (data.ok) setOk(true);
    } catch (err) {
      toast("Become Instructor first");
      setOk(false);
      window.location.href = "/user";
    }
  };
  // "
  useEffect((p) => {
    getCurrentInstructor();
  }, []);
  return (
    // <>
    <>
      {!ok ? (
        <div className="container">
          <div className="d-flex p-2  justify-content-center">
            <SyncOutlined className=" text-danger display-1" spin />
          </div>
        </div>
      ) : (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                <Instructornav />
              </div>
              <div className="col-md-10">{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default requireInstructor;

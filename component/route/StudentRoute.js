// StudentRoute;

import { useState, useEffect } from "react";
import axios from "axios";

import { SyncOutlined } from "@ant-design/icons";

const StudentRoute = ({ children }) => {
  const [ok, setOk] = useState(false);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.post("/api/current-user");
      if (data.ok) setOk(true);
    } catch (err) {
      setOk(false);
    }
  };
  // "
  useEffect((p) => {
    getCurrentUser();
  }, []);
  return (
    // <>
    <>
      {!ok ? (
        <div className="    container-fluid   ">
          <div className="d-flex p-2  justify-content-center">
            <SyncOutlined className=" text-danger display-1" spin />
          </div>
        </div>
      ) : (
        <>
          <div className="">{children}</div>
        </>
      )}
    </>
  );
};
export default StudentRoute;

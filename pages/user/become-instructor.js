import { UserSwitchOutlined, SettingOutlined } from "@ant-design/icons";
import PayoutForm from "../../component/forms/payoutform";
import RequireSignin from "../../component/route/RequireSignin";
import { useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const becomeInstructor = () => {
  //
  const router = useRouter();
  const [ok, setOk] = useState(true);
  const getForm = async (p) => {
    p.preventDefault();
    // axios
    // toast
    try {
      const { data } = await axios.get("/api/is-instructor");
      if (data.ok === false) setOk(false);
    } catch (err) {
      setOk(true);
      router.push("/instrutor");
    }
  };
  return (
    <>
      <RequireSignin>
        <h1 className="jumbotron bg-primary text-center">become Instructor</h1>
        <div className="bg-gray justify-content-center col-md-6 offset-md-3 p-2">
          <div className="text-center">
            <UserSwitchOutlined className="justify-content-center display-1" />
            <h1>Setup payout to publish courses on Hedospher</h1>
            <div className=" text-warning">
              We will collect your account information to transfer earning to
              your bank account
            </div>
            <Button
              disabled={!ok}
              className="mt-3 mb-4"
              icon={<SettingOutlined />}
              block
              type="primary"
              shape="round"
              size="large"
              onClick={getForm}
            >
              Payout Setup
            </Button>
          </div>
          {!ok && <PayoutForm />}
        </div>
      </RequireSignin>
    </>
  );
};

export default becomeInstructor;

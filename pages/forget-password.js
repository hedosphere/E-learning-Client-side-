import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { Context } from "../context";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";

// import { Contexty } from "../context";

const forgetpassword = () => {
  const [email, setEmail] = useState("hedosphere@gmail.com");
  const [newpassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const route = useRouter();

  const {
    state: { user },
  } = useContext(Context);
  //   const inputData = { email, password, loading };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //
      const { data } = await axios.post("/api/sendcode", { email });
      setCodeSent(true);
      // console.log("code sent/ >" + data);
      toast(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // "/reset-password"
      const { data } = await axios.post("/api/reset-password", {
        newpassword,
        email,
        code,
      });
      setCodeSent(true);
      toast.success("Password reset sucessfully, pls login");
      route.push("/login");
      // console.log("Password reset");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };
  useEffect(
    (p) => {
      if (user) route.push("/");
    },
    [user]
  );
  return (
    <>
      {user ? (
        <>
          <UserOutlined className="d-flex display-1 text-danger justify-content-center" />
        </>
      ) : (
        <>
          <h1 className="jumbotron bg-warning ">Reset password </h1>

          <div className="col-md-4 p-1 bg-gray offset-md-4">
            <form
              // onSubmit={handleSendCode}
              // onSubmit={handleResetPassword}
              onSubmit={!codeSent ? handleSendCode : handleResetPassword}
              className="form-group"
            >
              <input
                type="email"
                value={email}
                placeholder="Your Email"
                className="form-control mb-2 "
                onChange={(p) => setEmail(p.target.value)}
                disabled={loading || codeSent}
              />

              <input
                type="text"
                value={code}
                placeholder="Your Code"
                className="form-control mb-2 "
                onChange={(p) => setCode(p.target.value)}
                disabled={loading || !codeSent}
                hidden={!codeSent}
              />

              <input
                type="password"
                value={newpassword}
                placeholder="Your Password"
                className="form-control mb-2 "
                onChange={(p) => setNewPassword(p.target.value)}
                disabled={loading || !codeSent}
                hidden={!codeSent}
              />

              <button
                type="submit"
                disabled={loading}
                className="ant-btn mb-2  ant-btn-block btn-success"
              >
                {!codeSent ? "  Send Code" : "Reset Password"}
              </button>
            </form>

            <p className="text-center text-white">
              <Link href="/login">Login instead</Link>
            </p>
          </div>
        </>
      )}{" "}
    </>
  );
};
export default forgetpassword;

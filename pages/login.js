import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { Context } from "../context";
import { useRouter } from "next/router";
// import { Contexty } from "../context";

const login = () => {
  // const [email, setEmail] = useState("hedophere@hotmail.com");
  const [email, setEmail] = useState("hedosphere@gmail.com");

  // const [email, setEmail] = useState("odeh2@we.men");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const inputData = { email, password, loading };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(state);

    try {
      const { data } = await axios.post("/api/login", inputData);
      toast.success("Login successfuly");
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      window.localStorage.setItem("user", JSON.stringify(data));

      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  useEffect(
    (p) => {
      if (user) router.push("/user");
    },
    [user]
  );
  return (
    <>
      <>
        <h1 className="jumbotron bg-warning ">Login </h1>

        <div className="col-md-4 p-1 bg-gray offset-md-4">
          <form onSubmit={handleLogin} className="form-group">
            <input
              type="email"
              value={email}
              placeholder="Your Email"
              className="form-control mb-2 "
              onChange={(p) => setEmail(p.target.value)}
              disabled={loading}
            />

            <input
              type="password"
              value={password}
              placeholder="Your Password"
              className="form-control mb-2 "
              onChange={(p) => setPassword(p.target.value)}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="ant-btn mb-2  ant-btn-block btn-success"
            >
              Login
            </button>
          </form>

          <p className="text-center text-white">
            Don't have account? <Link href="/register">Register</Link> ||{" "}
            <Link href="/forget-password">Forget Password</Link>
          </p>
        </div>
      </>
    </>
  );
};
export default login;

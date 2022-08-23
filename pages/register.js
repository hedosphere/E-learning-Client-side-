import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Context } from "../context";

const register = () => {
  const [name, setName] = useState("Emmanuel Asuama");
  // const [email, setEmail] = useState("hedophere@hotmail.com");
  // const [email, setEmail] = useState("odeh2@we.men");
  const [email, setEmail] = useState("hedosphere@gmail.com");

  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);
  const route = useRouter();
  const inputData = { name, email, password, loading };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/register", inputData);
      toast.success("Registeration completed");

      setLoading(false);
    } catch (err) {
      console.log(err);
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
      <>
        <h1 className="jumbotron bg-success ">Register </h1>

        <div className="col-md-4 p-1 bg-gray offset-md-4">
          <form onSubmit={handleRegister} className="form-group">
            <input
              type="text"
              value={name}
              placeholder="Your Name"
              className="form-control mb-2 "
              onChange={(p) => setName(p.target.value)}
              disabled={loading}
            />

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
              disabled={loading || !name || !email || !password}
              className="ant-btn mb-2  ant-btn-block btn-success"
            >
              Register
            </button>
          </form>

          <p className="text-center text-white">
            Have account already? <Link href="/login">Login</Link>
          </p>
        </div>
      </>
    </>
  );
};
export default register;

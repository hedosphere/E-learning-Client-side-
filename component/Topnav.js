import { Avatar, Menu } from "antd";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import {
  LoginOutlined,
  UserAddOutlined,
  HomeOutlined,
  ArrowRightOutlined,
  DatabaseTwoTone,
  CarryOutOutlined,
  TeamOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

const topnav = () => {
  const createCourse = async (p) => {
    try {
      const { data } = await axios.post("/api/course/create");
      alert("create course  authorize");
    } catch (err) {
      alert("create course not authorize");
    }
  };

  //
  const [navstate, setNavstate] = useState("");
  const route = useRouter();
  const {
    dispatch,
    state: { user },
  } = useContext(Context);
  const logout = (p) => {
    try {
      axios.get("/api/logout");
      window.localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      toast("Logout successfully");
      route.push("/login");
    } catch (err) {
      toast("Unable to Logout");
    }
  };
  useEffect(
    //
    (p) => {
      process.browser && setNavstate(window.location.pathname);
    },

    [process.browser && window.location.pathname]
  );

  const items = [
    {
      label: <Link href="/">Home</Link>,

      icon: <HomeOutlined />,

      key: "/",
    },

    //  CarryOutOutlined,TeamOutlined
    user && user.role && !user.role.includes("Instructor")
      ? {
          label: <Link href="/user/become-instructor">Become Instructor</Link>,
          icon: <TeamOutlined />,
          key: "/user/become-instructor",
        }
      : user && {
          label: <Link href="/instructor/courses/create">Create Course</Link>,
          icon: <CarryOutOutlined />,
          key: "/instructor/courses/create",
        },

    !user && {
      style: { marginLeft: "auto" },
      label: <Link href="/login">Login</Link>,
      icon: <LoginOutlined />,
      key: "/login",
    },
    !user && {
      style: { marginLeft: "1px" },
      label: <Link href="/register">Register</Link>,
      icon: <UserAddOutlined />,

      key: "/register",
    },
    user &&
      user.role &&
      user.role.includes("Instructor") && {
        label: <Link href="/instructor">Instructor</Link>,
        // onClick: () => logout(),
        style: { marginLeft: "auto" },

        icon: <DatabaseTwoTone />,
        key: "/instructor",
      },
    user && {
      label: user.name,
      style: user.role.includes("Instructor")
        ? { marginLeft: "1px" }
        : { marginLeft: "auto" },

      icon: <Avatar src="/pictures/pexels-nida-12548883.jpg" />,
      children: [
        user &&
          user.role &&
          user.role.includes("Instructor") && {
            label: <Link href="/instructor">Instructor</Link>,
            // onClick: () => logout(),
            icon: <DatabaseTwoTone />,
            // key: "/instructor",
          },

        {
          label: <Link href="/user">Dashboard</Link>,
          // onClick: () => logout(),
          icon: <UserOutlined />,
          key: "/user",
        },
        {
          label: "Logout",
          onClick: () => logout(),
          icon: <LogoutOutlined />,
          key: "/logout",
        },
      ],
    },
  ];
  return (
    <div className="mb-1">
      <>
        <Menu
          className=" fixed-top mb-6"
          // style={{ marginBottom: "200px" }}
          // fixed="top"
          theme="dark"
          mode="horizontal"
          selectedKeys={navstate}
          items={items}
        />
        <div style={{ marginBottom: "48px" }}></div>
      </>
    </div>
  );
};
export default topnav;

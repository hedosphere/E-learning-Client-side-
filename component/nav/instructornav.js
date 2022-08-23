import { useEffect, useState, useContext } from "react";
import Link from "next/link";

const instructorNav = (p) => {
  const [navstate, setNavstate] = useState("");

  useEffect(
    (p) => {
      process.browser && setNavstate(window.location.pathname);
    },

    [process.browser && window.location.pathname]
  );

  return (
    <>
      <>
        <div className="nav nav-pills flex-column">
          <Link href="/instructor">
            <a
              className={`mb-2 nav-link ${
                navstate === "/instructor" && "active"
              }`}
            >
              Dashboard
            </a>
          </Link>
          <Link href="/instructor/courses/create">
            <a
              className={`mb-2 nav-link ${
                navstate === "/instructor/courses/create" && "active"
              }`}
            >
              Create Course
            </a>
          </Link>
        </div>
        {/* <h1>user nav</h1> */}
      </>
    </>
  );
};

export default instructorNav;

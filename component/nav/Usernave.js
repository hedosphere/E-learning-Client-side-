import Link from "next/link";

const userNav = (p) => {
  return (
    <>
      <>
        <div className="nav nav-pills flex-column">
          <Link href="/user">
            <span className="nav-link active">Dashboard</span>
          </Link>
        </div>
        {/* <h1>user nav</h1> */}
      </>
    </>
  );
};

export default userNav;

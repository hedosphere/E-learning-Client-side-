import App from "next/app";
import Topnav from "../component/Topnav";
import { Provider } from "../context";
import "antd/dist/antd.css";
import "../public/style/index.css";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MyApp = ({ Component, pprops }) => {
  return (
    <>
      <Provider className=" bg-gray">
        {" "}
        {/* container-fluid */}
        <ToastContainer position="top-right" />
        <Topnav />
        <>
          <Component {...pprops} />
        </>
      </Provider>
    </>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;

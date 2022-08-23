import { useEffect, useState, createContext, useReducer } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const initialState = { user: null };

const Context = createContext();

const stateUpdate = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };

    default:
      return user;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(stateUpdate, initialState);
  const route = useRouter();

  axios.interceptors.response.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((p) => {
              console.log("/kick out by AXIOS INTERCEPTOR ");
              window.localStorage.removeItem("user");
              dispatch({ type: "LOGOUT" });
              route.push("/login");
            })
            .catch((p) => {
              console.log("/AXIOS INTERCEPTOR ERROR");
            });
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect((p) => {
    getCsrfToken();
  }, []);
  const getCsrfToken = async (p) => {
    try {
      const { data } = await axios.get("/api/get-csrf-token");
      // console.log("csrf header", data);
      axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
    } catch (err) {
      console.log("/axios err", err);
    }
  };

  useEffect((p) => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Provider, Context };

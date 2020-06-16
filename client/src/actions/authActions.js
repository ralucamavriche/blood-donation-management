import axios from "axios";
import { returnErrors } from "./errorActions";
import jwt from "jwt-decode";
// import { mainAPI } from '../config';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  const token = localStorage.getItem("token");
  const idUser = token && jwt(token).id;
  token &&
    axios
      .get(`/api/auth/user/${idUser}`, tokenConfig(getState))
      .then((res) => {
        if (res.data.status === "failed") {
          alert("failed");
          return dispatch({
            type: AUTH_ERROR,
          });
        } else
          return dispatch({
            type: USER_LOADED,
            payload: res.data,
          });
      })
      .catch((err) => {
        // dispatch(returnErrors(err.response.data, err.response.status));
        alert("err load user");
        dispatch({
          type: AUTH_ERROR,
        });
      });
};

// Register User
export const register = ({ name, email, password, role }, history) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then((res) => {
      axios
        .post("/api/email", { name, email, linkTo })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          returnErrors(err.response.data);
        });
      if (role !== "donor") {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      }
      if (history !== null) return history.push("/login");
      else return null;
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login User
export const login = ({ email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then((res) => {
      console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  //Get token from localstorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
    id: "application/json",
    body: {
      id: "5ec3c784b54a553d948ff5a2",
    },
  };

  //If token, add to header
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

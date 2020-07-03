import axios from "axios";
import { returnAlert } from "./errorActions";
import jwt from "jwt-decode";
// import { mainAPI } from '../config';
import {
  USER_LOADED,
  USER_LOADING,
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
  // localStorage.clear()

  const token = localStorage.getItem("token");
  if (token === null || token === "undefind" || token.length < 20) {
    localStorage.clear();
  } else {
    const idUser = token && jwt(token)._id;
    token &&
      axios
        .get(`/api/auth/user/${idUser}`, tokenConfig(getState))
        .then((res) => {
          if (res.data.status === "failed") {
            dispatch(returnAlert("Error at load user!", "danger"));
          } else
            return dispatch({
              type: USER_LOADED,
              payload: res.data,
            });
        })
        .catch((err) => {
          dispatch(
            returnAlert(
              `[${err.response.status}] : ${
                err.response.data + ": Error load User"
              }`,
              "danger"
            )
          );
        });
  }
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
  const body = JSON.stringify({ name, email, password, role });

  const linkTo = window.location;

  axios
    .post("/api/users", body, config)
    .then((res) => {
      axios
        .post("/api/email", { name, email, linkTo })
        .then((res) => {
          if (res.data.status !== "failed")
            return dispatch(returnAlert("Email sent Successfully!", "info"));
          else return dispatch(returnAlert("Email not sent!", "danger"));
        })
        .catch((err) => {
          // return dispatch(
          //   returnAlert(
          //     `[${err.response.status}] : ${
          //       err.response.data + ": Email not sent!"
          //     }`,
          //     "danger"
          //   )
          // );
      return console.log('Email not sent!');
        });
      if (role !== "donor") {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        dispatch(returnAlert("Account created Successfully", "success"));
      }
      if (history !== null) return history.push("/login");
      else return null;
    })
    .catch((err) => {
      if(role === 'donor'){
      console.log('Email already exist')
      }else{
        dispatch(
          returnAlert("Email or password  already exist",
            "danger"
          )
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      }
      
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
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${
            err.response.data + ": Error Register User"
          }`,
          "danger"
        )
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

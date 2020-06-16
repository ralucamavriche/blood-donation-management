import axios from "axios";
import { GET_REQUESTS, ADD_REQUESTS, ADD_COMMENT,GET_APPOINTMENTS } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
// import { mainAPI } from '../config';

export const updateViewField = (id_notification, viewedBy) => (dispatch) => {
  console.log(id_notification, viewedBy);
  axios
    .patch(`/api/request/${id_notification}`, { viewedBy })
    .then((res) => {
      console.log("updated");
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const updateAppointment = (id_app, status) => (dispatch) => {
    axios
      .patch(`/api/appointment/${id_app}`, { status })
      .then((res) => {
        console.log('add message')
      })
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };
export const getRequests = () => (dispatch) => {
  axios
    .get("/api/request")
    .then((res) => {
      dispatch({
        type: GET_REQUESTS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getAppointment = () => (dispatch) => {
    axios
      .get("/api/appointment")
      .then((res) => {
        dispatch({
          type: GET_APPOINTMENTS,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };
export const addRequest = (request) => (dispatch) => {
  axios
    .post("/api/request", request)
    .then((res) => {
      console.log(res);
      if (res.data.errors) {
        console.log(res.data);
      } else {
        console.log(res.data);
        return dispatch({
          type: ADD_REQUESTS,
          payload: res.data,
        });
      }
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const addAppointment = (request) => (dispatch) => {
  axios
    .post("/api/appointment", request)
    .then((res) => {
      console.log(res);
      if (res.data.errors) {
        return console.log(res.data);
      } else {
       alert('Thank you for your appointment')
        // return dispatch({
        //     type: ADD_REQUESTS,
        //     payload: res.data
        // })
      }
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addComment = (id, comments) => (dispatch) => {
  return axios
    .patch(`/api/request/${id}`, { comments })
    .then((res) => {
      console.log("updated");
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

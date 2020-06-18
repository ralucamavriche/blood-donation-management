import axios from "axios";
import {
  GET_REQUESTS,
  ADD_REQUESTS,
  ADD_COMMENT,
  GET_APPOINTMENTS,
  OPEN_ALERT,
  CLOSE_ALERT,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnAlert } from "./errorActions";
// import { mainAPI } from '../config';

export const updateViewField = (id_notification, viewedBy) => (dispatch) => {
  console.log(id_notification, viewedBy);
  axios
    .patch(`/api/request/${id_notification}`, { viewedBy })
    .then((res) => {
      dispatch(returnAlert("Notification Viewed", "success"));
      return null;
    })
    .catch((err) =>
    dispatch(
      returnAlert(
        `[${err.response.status}] : ${
          err.response.data + ": :Update Notification Failed"
        }`,
        "danger"
      )
    )
    );
};
export const updateAppointment = (id_app, status) => (dispatch) => {
  axios
    .patch(`/api/appointment/${id_app}`, { status })
    .then((res) => {
      dispatch(returnAlert("Appointment Updated Successfully", "success"));
    })
    .catch((err) =>
    dispatch(
      returnAlert(
        `[${err.response.status}] : ${
          err.response.data + ": :Update Appointment Failed"
        }`,
        "danger"
      )
    )
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
    dispatch(
      returnAlert(
        `[${err.response.status}] : ${
          err.response.data + ": :GET Request Failed"
        }`,
        "danger"
      )
    )
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
    dispatch(
      returnAlert(
        `[${err.response.status}] : ${
          err.response.data + ": :GET  Appointments Failed"
        }`,
        "danger"
      )
    )
    );
};
export const addRequest = (request) => (dispatch) => {
  axios
    .post("/api/request", request)
    .then((res) => {
      if (res.data.errors) {
        console.log(res.data);
        alert('Avem errori addrequest')
      } else {
        dispatch(returnAlert("Notification Added Successfully", "success"));
        return dispatch({
          type: ADD_REQUESTS,
          payload: res.data,
        });
      }
    })
    .catch((err) =>
    dispatch(
      returnAlert(
        `[${err.response.status}] : ${
          err.response.data + ": :Add Notification Failed"
        }`,
        "danger"
      )
    )
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
        dispatch(returnAlert("Add Appointment Successfully", "success"));
      }
    })
    .catch((err) =>
    dispatch(
      returnAlert(
        `[${err.response.status}] : ${
          err.response.data + ": :Add Appointment Failed"
        }`,
        "danger"
      )
    )
    );
};

export const addComment = (id, comments) => (dispatch) => {
  return axios
    .patch(`/api/request/${id}`, { comments })
    .then((res) => {
      dispatch(returnAlert("Add Comment Successfully", "success"));
    })
    .catch((err) =>
    dispatch(
      returnAlert(
        `[${err.response.status}] : ${
          err.response.data + ": :Add Comment Failed"
        }`,
        "danger"
      )
    )
    );
};

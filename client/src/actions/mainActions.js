import axios from "axios";
import { returnAlert } from "./errorActions";
import { GET_FEEDBACKS, CLOSE_ALERT,GET_QUESTIONS,LOGIN_SUCCESS } from "./types";

export const addFeedback = (feedback) => (dispatch) => {
  return axios
    .post(`/api/feedback`, feedback)
    .then((res) => {
      dispatch(returnAlert("Add Feedback Successfully", "success"));
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${
            err.response.data + ": :Add Feedback Failed"
          }`,
          "danger"
        )
      )
    );
};

export const addQuestion = (question) => (dispatch) => {
  return axios
    .post(`/api/question`, question)
    .then((res) => {
      dispatch(returnAlert("Add Question Successfully", "success"));
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${
            err.response.data + ": :Add Question Failed"
          }`,
          "danger"
        )
      )
    );
};

export const closeAlert = () => (dispatch) => {
  return dispatch({
    type: CLOSE_ALERT,
    payload: { text: "" },
  });
};

export const getFeedbacks = () => (dispatch) => {
  axios
    .get("/api/feedback")
    .then((res) => {
      dispatch({
        type: GET_FEEDBACKS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${
            err.response.data + ": :Feedbacks Failed"
          }`,
          "danger"
        )
      )
    );
};

export const updateFeedback = (id_app, status) => (dispatch) => {
  axios
    .patch(`/api/feedback/${id_app}`, { status })
    .then((res) => {
      dispatch(returnAlert("Update Feedback Successfully", "success"));
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${
            err.response.data + ": :Update Feedback Failed"
          }`,
          "danger"
        )
      )
    );
};
export const updateUser = (id_app, data) => (dispatch) => {
  axios
    .patch(`/api/users/${id_app}`, data)
    .then((res) => {
      dispatch(returnAlert("Update User Successfully", "success"));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${
            err.response.data + ": :Update User Failed"
          }`,
          "danger"
        )
      )
    );
};
export const updateUserPassword = (id_app, data) => (dispatch) => {
  axios
    .post(`/api/users/password/${id_app}`, data)
    .then((res) => {
      dispatch(returnAlert("Update User Password Successfully", "success"));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${
            err.response.data + err.response.data.msg || ": :Update User Failed"
          }`,
          "danger"
        )
      )
    );
};
export const getQuestions = () => (dispatch) => {
  axios
    .get("/api/question")
    .then((res) => {
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${
            err.response.data + ":Questions Failed"
          }`,
          "danger"
        )
      )
    );
};

export const updateQuestions = (id_app, data) => (dispatch) => {
  axios
    .patch(`/api/question/${id_app}`,data)
    .then((res) => {
      dispatch(returnAlert("Update Questions Successfully", "success"));
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${
            err.response.data + ": Update Questions Failed"
          }`,
          "danger"
        )
      )
    );
};


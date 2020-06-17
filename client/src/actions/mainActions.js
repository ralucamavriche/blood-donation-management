import axios from "axios";
import { returnErrors } from "./errorActions";
import { GET_FEEDBACKS} from "./types";


export const addFeedback = (feedback) => (dispatch) => {
  console.log(feedback);
  return axios
    .post(`/api/feedback`, feedback)
    .then((res) => {
      console.log("Feedback");
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateFeedback = (id_app, status) => (dispatch) => {
  axios
    .patch(`/api/feedback/${id_app}`, { status })
    .then((res) => {
      console.log("Add message");
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

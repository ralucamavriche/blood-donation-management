import axios from "axios";
import {
  GET_DONORS,
  DELETE_DONORS,
  DONORS_LOADING,
  SET_CURRENT_DONOR,
  CHANGE_CURRENT_DONOR_INFO,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnAlert } from "./errorActions";
// import { mainAPI } from '../config';

export const getDonors = () => (dispatch) => {
  dispatch(setDonorsLoding());
  axios
    .get("/api/donors")
    .then((res) => {
      dispatch({
        type: GET_DONORS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${
            err.response.data + ": :Donors GET Failed"
          }`,
          "danger"
        )
      )
    );
};

export const changeCurrentDonorInfo = (payload) => (dispatch) => {
  return dispatch({
    type: CHANGE_CURRENT_DONOR_INFO,
    payload,
  });
};
export const updateDonorInfo = (id, currentDonor) => (dispatch) => {
  axios
    .patch(`/api/donors/${id}`, currentDonor)
    .then((res) => {
      dispatch({
        type: CHANGE_CURRENT_DONOR_INFO,
        payload: { name: "isSuccessUpdate", value: true },
      });
      window.setTimeout(() => {
        dispatch({
          type: CHANGE_CURRENT_DONOR_INFO,
          payload: { name: "isSuccessUpdate", value: false },
        });
      }, 2000);
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${
            err.response.data + ":Donor Update  Failed"
          }`,
          "danger"
        )
      )
    );
};

export const getCurrentDonorById = (id) => (dispatch) => {
  axios
    .get(`/api/donors/${id}`)
    .then((res) => {
      dispatch({
        type: SET_CURRENT_DONOR,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${
            err.response.data + ":GET Donor by ID Failed"
          }`,
          "danger"
        )
      )
    );
};

export const addDonor = (donor) => (dispatch, getState) => {
  axios
    .post("/api/donors", donor, tokenConfig(getState))
    .then((res) => {
      if (res.data.errors) {
        alert("Donor Failed : Actions Redux");
      } else {
        dispatch(returnAlert("Donor added Successfully", "success"));
        return getDonors();
      }
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${err.response.data + ": :Donor Failed"}`,
          "danger"
        )
      )
    );
};

export const deleteDonor = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/donors/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(returnAlert("Donor deleted Successfully", "success"));
      return dispatch({
        type: DELETE_DONORS,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(
        returnAlert(
          `[${err.response.status}] : ${err.response.data + ": :Donor Failed"}`,
          "danger"
        )
      )
    );
};

export const setDonorsLoding = () => {
  return {
    type: DONORS_LOADING,
  };
};

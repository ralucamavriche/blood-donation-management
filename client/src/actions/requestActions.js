import axios from "axios";
import {
  GET_REQUESTS,
  ADD_REQUESTS,
  GET_APPOINTMENTS,
} from "./types";
import { returnAlert } from "./errorActions";
// import { mainAPI } from '../config';

export const updateViewField = (id_notification, viewedBy) => (dispatch) => {
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
export const updateAppointment = (id_app, status,name='Gliga Dumitru',email='gliga_dumitru@yahoo.com',linkTo='',hospitalName='Hospital Nr.5', appointmentDate='12.12.202 12:15AM') => (dispatch) => {
  axios
    .patch(`/api/appointment/${id_app}`, { status })
    .then((res) => {
      dispatch(returnAlert("Appointment Updated Successfully", "success"));
      let message = {}
      const messageAccept = {
        title:'Thank you for your appointment!',
        details:`The donation center: ${hospitalName}, is waiting for you on ${appointmentDate}. Take care of you!`
      }
      const messageDenied = {
        title:'About your appointment!',
        details:`The donation center: ${hospitalName}, has canceled your appointment. Please make another appointment!`
      }
      message = status === 'Accepted' ? messageAccept : messageDenied
      axios
        .post("/api/email", { name, email, linkTo,title:message.title,details:message.details })
        .then((res) => {
          if (res.data.status !== "failed")
            return dispatch(returnAlert("Email sent Successfully!", "info"));
            else return dispatch(returnAlert("Email not sent!", "danger"));
        })
        .catch((err) => {
          // return dispatch(
          //   returnAlert(
          //     `[${err.response.status}] : ${
          //       err.response.data + ": Error load User"
          //     }`,
          //     "danger"
          //   )
          // );
          return console.log('email not send')
        });
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

        // alert('Avem errori addrequest')
        dispatch(returnAlert("Input invalid.Incercati din nou.", "danger"));
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

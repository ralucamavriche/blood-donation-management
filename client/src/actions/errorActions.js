import {  CLEAR_ERRORS,OPEN_ALERT,CLOSE_ALERT } from "./types";

export const returnAlert = (text, style) => dispatch => {
    dispatch({
        type: OPEN_ALERT,
        payload: {
          text: text,
          style: style,
        },
      });
      window.setTimeout(() => {
        dispatch({
          type: CLOSE_ALERT,
          payload: { text: "" },
        });
      }, 3000);
}
//RETURN ERRORS
export const returnErrors = (msg, status, id = null) => dispatch =>{
    dispatch({
        type: OPEN_ALERT,
        payload: {
          text: `[${status}] : ${msg}`,
          style: "danger",
        },
      });
      window.setTimeout(() => {
        dispatch({
          type: CLOSE_ALERT,
          payload: { text: "" },
        });
      }, 3000);
    return null;
};

// CLEAR ERRORS
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

import {
  GET_FEEDBACKS,
  OPEN_ALERT,
  CLOSE_ALERT,
  GET_QUESTIONS,
} from "../actions/types";

const initialState = {
  feedbacks: [],
  questions: [],
  isOpenAlert: false,
  text: "",
  style: "success",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FEEDBACKS:
      return {
        ...state,
        feedbacks: action.payload,
      };
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case OPEN_ALERT: {
      return {
        ...state,
        isOpenAlert: true,
        text: action.payload.text,
        style: action.payload.style,
      };
    }
    case CLOSE_ALERT: {
      return {
        ...state,
        isOpenAlert: false,
        text: action.payload.text,
      };
    }
    default:
      return state;
  }
}

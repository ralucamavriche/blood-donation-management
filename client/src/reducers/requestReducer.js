import { GET_REQUESTS, ADD_REQUESTS, ADD_COMMENT,GET_APPOINTMENTS } from "../actions/types";

const initialState = {
  requests: [],
  appointments:[]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REQUESTS:
      return {
        ...state,
        requests: action.payload,
      };
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
        // loading: false
      };
    case ADD_REQUESTS:
      return {
        ...state,
        requests: [action.payload, ...state.requests],
      };
    case ADD_COMMENT:
      return {
        ...state,
        requests: [action.payload, ...state.requests],
      };
    default:
      return state;
  }
}

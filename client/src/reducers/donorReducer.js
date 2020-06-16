import {
  GET_DONORS,
  CHANGE_CURRENT_DONOR_INFO,
  ADD_DONORS,
  DELETE_DONORS,
  DONORS_LOADING,
  SET_CURRENT_DONOR,
} from "../actions/types";

const initialState = {
  donors: [],
  currentDonor: {
    isSuccessUpdate: false,
  },
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DONORS:
      return {
        ...state,
        donors: action.payload,
        loading: false,
      };
    case CHANGE_CURRENT_DONOR_INFO:
      return {
        ...state,
        currentDonor: {
          ...state.currentDonor,
          [action.payload.name]: action.payload.value,
        },
      };
    case DELETE_DONORS:
      return {
        ...state,
        donors: state.donors.filter((donor) => donor._id !== action.payload),
      };
    case ADD_DONORS:
      return {
        ...state,
        donors: [action.payload, ...state.donors],
      };
    case SET_CURRENT_DONOR:
      return {
        ...state,
        currentDonor: {
          ...state.currentDonor,
          ...action.payload,
        },
      };
    case DONORS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

// progrsmsre
// edit l MY APIIMENT
// CRUD OPERATION
// DATA BASE 
// TRIMITE MAIL
// SPITSL VEDE PROGRSMSRILE PT DONATORII RESPECTIVI

import axios from 'axios';
import { GET_DONORS, ADD_DONORS, DELETE_DONORS, DONORS_LOADING, EDIT_DONOR, SET_CURRENT_DONOR, CHANGE_CURRENT_DONOR_INFO } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
// import { mainAPI } from '../config';


export const getDonors = () => dispatch => {
    dispatch(setDonorsLoding());
    axios
        .get('/api/donors')
        .then(res => {
            // console.log(res)
            dispatch({
                type: GET_DONORS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));

};

export const changeCurrentDonorInfo = (payload) => dispatch => {
    return dispatch({
        type: CHANGE_CURRENT_DONOR_INFO,
        payload
    })
}
export const updateDonorInfo = (id, currentDonor) => dispatch => {
    axios
        .patch(`/api/donors/${id}`, currentDonor)
        .then(res => {
            console.log(res);
            dispatch({
                type: CHANGE_CURRENT_DONOR_INFO,
                payload: { name: "isSuccessUpdate", value: true }
            })
            window.setTimeout(()=>{
                dispatch({
                    type: CHANGE_CURRENT_DONOR_INFO,
                    payload: { name: "isSuccessUpdate", value: false }
                })
              },2000)
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
}

export const getCurrentDonorById = id => dispatch => {
    axios
        .get(`/api/donors/${id}`)
        .then(res => {
            dispatch({
                type: SET_CURRENT_DONOR,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
}


export const addDonor = donor => (dispatch, getState) => {
    axios
        .post('/api/donors', donor, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_DONORS,
                payload: res.data
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));

};

export const deleteDonor = id => (dispatch, getState) => {
    axios
        .delete(`/api/donors/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_DONORS,
                payload: id
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));

};

// export const editDonor = id => (dispatch, getState) => {
//     axios
//         .patch(`/api/donors/${id}`, tokenConfig(getState))
//         .then(res =>
//             dispatch({
//                 type: EDIT_DONOR,
//                 payload: id
//             }))
//         .catch(err =>
//             dispatch(returnErrors(err.response.data, err.response.status)));
// };

export const setDonorsLoding = () => {
    return {
        type: DONORS_LOADING
    };
};
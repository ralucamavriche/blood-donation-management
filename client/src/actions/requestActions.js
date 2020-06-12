import axios from 'axios';
import { GET_REQUESTS, ADD_REQUESTS} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
// import { mainAPI } from '../config';


export const getRequests = () => dispatch => {
    axios
        .get('/api/request')
        .then(res => {
            dispatch({
                type: GET_REQUESTS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));

};


export const addRequest = request => dispatch=> {
    axios
        .post('/api/request', request)
        .then(res => {
            console.log(res)
            if (res.data.errors) {
                console.log(res.data)
            } else
            {
                console.log(res.data)
                return dispatch({
                    type: ADD_REQUESTS,
                    payload: res.data
                })
            }
                
        }
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status)));
};


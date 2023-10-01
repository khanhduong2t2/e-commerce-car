import axios from 'axios';
import { listAPIs } from './API/ListAPIs';
import { GET_LIST_CERTIFIED_FAIL, GET_LIST_CERTIFIED_REQUEST, GET_LIST_CERTIFIED_SUCCESS } from '../Constants/CertifiedConstants';

export const getListCertified = (lang) => async (dispatch) => {
    try {
        dispatch({ type: GET_LIST_CERTIFIED_REQUEST });


        const config = {
            headers: {
                "Content-Type": "application/json",
                "lang": lang
            }
        }

        let { data } = await axios.get(listAPIs.GET_LIST_CERTIFIED, config);
        if (data.status && data.data) {
            dispatch({
                type: GET_LIST_CERTIFIED_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: GET_LIST_CERTIFIED_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: GET_LIST_CERTIFIED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

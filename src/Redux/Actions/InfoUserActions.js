import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { listAPIs } from './API/ListAPIs';
import {
    GET_INFO_USER_FAIL, GET_INFO_USER_REQUEST, GET_INFO_USER_SUCCESS,
    GET_SUGGEST_ADDRESS_FAIL, GET_SUGGEST_ADDRESS_REQUEST, GET_SUGGEST_ADDRESS_SUCCESS,
    UPDATE_INFO_USER_FAIL, UPDATE_INFO_USER_REQUEST, UPDATE_INFO_USER_SUCCESS,
    UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS
} from '../Constants/InfoUserConstants';

export const getInfoUser = (customer_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_INFO_USER_REQUEST });

        const getAccessToken = Cookies.get('accessToken');
        const accessToken = JSON.parse(getAccessToken).token;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let inputData = {
            customer_id,
        }

        let { data } = await axios.post(listAPIs.GET_INFO_USER, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: GET_INFO_USER_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: GET_INFO_USER_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: GET_INFO_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateInfoUser = (inputData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_INFO_USER_REQUEST });

        const getAccessToken = Cookies.get('accessToken');
        const accessToken = JSON.parse(getAccessToken).token;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let { data } = await axios.post(listAPIs.UPDATE_INFO_USER, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: UPDATE_INFO_USER_SUCCESS,
                payload: data.data
            })
            toast.success('Thành công !', {
                autoClose: 3000,
            });
        } else {
            dispatch({
                type: UPDATE_INFO_USER_FAIL,
                payload: data.message
            })
            toast.error('Có lỗi! Bạn vui lòng thử lại sau', {
                autoClose: 3000,
            });
        }
    } catch (error) {
        dispatch({
            type: UPDATE_INFO_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
        toast.error('Có lỗi! Bạn vui lòng thử lại sau', {
            autoClose: 3000,
        });
    }
}

export const updatePassword = (inputData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const getAccessToken = Cookies.get('accessToken');
        const accessToken = JSON.parse(getAccessToken).token;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let { data } = await axios.post(listAPIs.CHANGE_PASSWORD, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: UPDATE_PASSWORD_SUCCESS,
                // payload: data.data
            })
            toast.success('Thành công !', {
                autoClose: 3000,
            });
        } else {
            dispatch({
                type: UPDATE_PASSWORD_FAIL,
                payload: data.message
            })

            if ([3000, 3001].includes(data.message.errCode)) {
                toast.error(data.message.errMessage, {
                    autoClose: 3000,
                });
            } else {
                toast.error('Có lỗi! Bạn vui lòng thử lại sau', {
                    autoClose: 3000,
                });
            }
        }
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
        toast.error('Có lỗi! Bạn vui lòng thử lại sau', {
            autoClose: 3000,
        });
    }
}


export const getSuggestAddress = (customer_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_SUGGEST_ADDRESS_REQUEST });

        const getAccessToken = Cookies.get('accessToken');
        const accessToken = JSON.parse(getAccessToken).token;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let inputData = {
            customer_id
        }

        let { data } = await axios.post(listAPIs.GET_SUGGEST_ADDRESS, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: GET_SUGGEST_ADDRESS_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: GET_SUGGEST_ADDRESS_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: GET_SUGGEST_ADDRESS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
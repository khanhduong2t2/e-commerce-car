import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { listAPIs } from './API/ListAPIs';
import {
    CREATE_FEEDBACK_PUBLIC_FAIL, CREATE_FEEDBACK_PUBLIC_REQUEST,
    CREATE_FEEDBACK_PUBLIC_SUCCESS, GET_FEEDBACK_PUBLIC_FAIL, GET_FEEDBACK_PUBLIC_REQUEST,
    GET_FEEDBACK_PUBLIC_SUCCESS, UPDATE_CONTENT, UPDATE_NUMBER_STAR
} from "../Constants/FeedbackConstant"

export const updateNumberStar = (number) => async (dispatch) => {
    dispatch({
        type: UPDATE_NUMBER_STAR,
        payload: {
            numberStar: number
        }
    })
}

export const updateContent = (content) => async (dispatch) => {
    dispatch({
        type: UPDATE_CONTENT,
        payload: {
            numberStar: content
        }
    })
}

export const createFeedbackPublic = (customer_id, product_id, number_star, content) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_FEEDBACK_PUBLIC_REQUEST });

        const getAccessToken = Cookies.get('accessToken');
        const accessToken = JSON.parse(getAccessToken).token;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let inputData = {
            customer_id, product_id, number_star, content
        }

        let { data } = await axios.post(listAPIs.CREATE_FEEDBACK_PUBLIC, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: CREATE_FEEDBACK_PUBLIC_SUCCESS,
                payload: data.data
            })

            dispatch(getListFBPublic(customer_id, product_id))
            toast.success('Cảm ơn bạn đã đánh giá !', {
                autoClose: 3000,
            });

        } else {
            dispatch({
                type: CREATE_FEEDBACK_PUBLIC_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: CREATE_FEEDBACK_PUBLIC_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getListFBPublic = (customer_id, product_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_FEEDBACK_PUBLIC_REQUEST });

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
            product_id
        }

        let { data } = await axios.post(listAPIs.GET_FEEDBACK_PUBLIC, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: GET_FEEDBACK_PUBLIC_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: GET_FEEDBACK_PUBLIC_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: GET_FEEDBACK_PUBLIC_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
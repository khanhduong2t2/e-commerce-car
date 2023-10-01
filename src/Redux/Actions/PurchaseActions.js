import axios from 'axios';
import { toast } from 'react-toastify';
import { listAPIs } from './API/ListAPIs';
import { getAccessTokenCommon } from './Common/getAccessToken';
import {
    GET_LIST_PURCHASE_REQUEST, GET_LIST_PURCHASE_FAIL, GET_LIST_PURCHASE_SUCCESS,
    CANCEL_PURCHASE_FAIL, CANCEL_PURCHASE_SUCCESS, CANCEL_PURCHASE_REQUEST,
    UPDATE_LIST_PURCHASE, FEEDBACK_PURCHASE_FAIL, FEEDBACK_PURCHASE_SUCCESS, FEEDBACK_PURCHASE_REQUEST
}
    from '../Constants/PurchaseConstants';

export const getListPurchase = (customer_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_LIST_PURCHASE_REQUEST });

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let inputData = {
            customer_id
        }

        let { data } = await axios.post(listAPIs.GET_LIST_PURCHASE, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: GET_LIST_PURCHASE_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: GET_LIST_PURCHASE_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: GET_LIST_PURCHASE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const cancelPurchaseAction = (customer_id, purchase_id, lang, index) => async (dispatch) => {
    try {
        dispatch({ type: CANCEL_PURCHASE_REQUEST });

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "lang": lang
            }
        }

        let inputData = {
            customer_id, purchase_id
        }

        let { data } = await axios.post(listAPIs.CANCEL_PURCHASE, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: CANCEL_PURCHASE_SUCCESS,
                payload: data
            })
            dispatch({
                type: UPDATE_LIST_PURCHASE,
                payload: {
                    index,
                    newPurchase: data.data
                }
            })
            toast.success(data.message, {
                autoClose: 3000
            })
        } else {
            dispatch({
                type: CANCEL_PURCHASE_FAIL,
                payload: data
            })
        }
    } catch (error) {
        dispatch({
            type: CANCEL_PURCHASE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const feedbackPurchaseAction = (customer_id, purchase_id, feedback, lang, index) => async (dispatch) => {
    try {
        dispatch({ type: FEEDBACK_PURCHASE_REQUEST });

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "lang": lang
            }
        }

        let inputData = {
            customer_id, purchase_id, feedback
        }

        let { data } = await axios.post(listAPIs.FEEDBACK_PURCHASE, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: FEEDBACK_PURCHASE_SUCCESS,
                payload: data
            })
            dispatch({
                type: UPDATE_LIST_PURCHASE,
                payload: {
                    index,
                    newPurchase: data.data
                }
            })
            toast.success(data.message, {
                autoClose: 3000
            })
        } else {
            dispatch({
                type: FEEDBACK_PURCHASE_FAIL,
                payload: data
            })
            toast.err("Có lỗi xảy ra! Bạn vui lòng thử lại sau", {
                autoClose: 3000
            })
        }
    } catch (error) {
        dispatch({
            type: FEEDBACK_PURCHASE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
        toast.err("Có lỗi xảy ra! Bạn vui lòng thử lại sau", {
            autoClose: 3000
        })
    }
}
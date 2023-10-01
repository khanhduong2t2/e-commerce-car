import axios from "axios"
import { listAPIs } from "./API/ListAPIs"
import {
    GET_INFO_PRODUCT_FAIL, GET_INFO_PRODUCT_REQUEST, GET_INFO_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_TYPE_FAIL, PRODUCT_TYPE_REQUEST, PRODUCT_TYPE_SUCCESS
}
    from "../Constants/ProductConstants"

export const listProduct = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(listAPIs.GET_LIST_PRODUCTS)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const detailsProduct = (product_id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`${listAPIs.DETAIL_PRODUCT}${product_id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getInfoProduct = (product_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_INFO_PRODUCT_REQUEST })

        const { data } = await axios.get(`${listAPIs.INFO_PRODUCT}${product_id}`)
        if (data.status && data.data) {
            dispatch({
                type: GET_INFO_PRODUCT_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: GET_INFO_PRODUCT_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: GET_INFO_PRODUCT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const listProductType = (type) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TYPE_REQUEST })

        const { data } = await axios.get(`${listAPIs.GET_PRODUCT_TYPE}${type}`)
        dispatch({
            type: PRODUCT_TYPE_SUCCESS,
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TYPE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
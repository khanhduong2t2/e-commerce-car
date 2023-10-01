import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { listAPIs } from './API/ListAPIs';
import { getAccessTokenCommon } from './Common/getAccessToken';
import {
    ADD_CART_FAIL, ADD_CART_REQUEST, ADD_CART_SUCCESS, GET_LIST_CART_FAIL, GET_LIST_CART_REQUEST,
    GET_LIST_CART_SUCCESS, REMOVE_ITEM_CART_FAIL, REMOVE_ITEM_CART_REQUEST, REMOVE_ITEM_CART_SUCCESS,
    UPDATE_SELECTED_SUCCESS, UPDATE_QUANTITY_FAIL, UPDATE_QUANTITY_REQUEST, UPDATE_QUANTITY_SUCCESS, UPDATE_SELECTED_FAIL
}
    from "../Constants/CartConstant";

export const addNewCart = (customer_id, product_id, quantity, lang) => async (dispatch) => {
    try {
        dispatch({ type: ADD_CART_REQUEST });

        const getAccessToken = Cookies.get('accessToken');
        const accessToken = JSON.parse(getAccessToken).token;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let inputData = {
            customer_id, product_id, quantity
        }

        let { data } = await axios.post(listAPIs.ADD_NEW_CART, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: ADD_CART_SUCCESS,
                payload: data.data
            })

            dispatch(getListCart(customer_id))
            toast.success(lang === "en" ? 'Add to cart successfully !' : 'Thêm vào giỏ hàng thành công !', {
                autoClose: 3000
            })
        } else {
            dispatch({
                type: ADD_CART_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: ADD_CART_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getListCart = (customer_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_LIST_CART_REQUEST });

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let { data } = await axios.get(`${listAPIs.GET_LIST_CART}${customer_id}`, config);
        if (data.status && data.data) {
            dispatch({
                type: GET_LIST_CART_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: GET_LIST_CART_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: GET_LIST_CART_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateSelected = (customer_id, new_list_carts) => async (dispatch) => {
    try {
        dispatch({ type: GET_LIST_CART_REQUEST });

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let list_carts = new_list_carts.map((item) => {
            return {
                id: item._id,
                is_selected: item.selected
            }
        })

        const inputData = {
            customer_id,
            list_carts
        }

        let { data } = await axios.patch(listAPIs.UPDATE_SELECT_CART, inputData, config);

        if (data.status && data.data && data.data.length === new_list_carts.length) {
            dispatch({
                type: UPDATE_SELECTED_SUCCESS,
                payload: new_list_carts
            })
        } else {
            dispatch({
                type: UPDATE_SELECTED_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: UPDATE_SELECTED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const removeItemCart = (customer_id, list_item_id) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_ITEM_CART_REQUEST });

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let inputData = {
            customer_id: customer_id,
            list_id_item: list_item_id
        }

        let { data } = await axios.post(listAPIs.REMOVE_ITEM_CART, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: REMOVE_ITEM_CART_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: REMOVE_ITEM_CART_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: REMOVE_ITEM_CART_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateQuantityItem = (customer_id, id_item, quantity) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_QUANTITY_REQUEST });

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let inputData = {
            customer_id, id_item, quantity
        }

        let { data } = await axios.post(listAPIs.UPDATE_QUANTITY_ITEM, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: UPDATE_QUANTITY_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: UPDATE_QUANTITY_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: UPDATE_QUANTITY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
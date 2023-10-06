import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { listAPIs } from "./API/ListAPIs";
import { getAccessTokenCommon } from './Common/getAccessToken';
import {
    GET_ORDER_WAITING_FAIL, GET_ORDER_WAITING_REQUEST, GET_ORDER_WAITING_SUCCESS,
    ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,
    ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS,
    RE_ORDER_FAIL, RE_ORDER_REQUEST, RE_ORDER_SUCCESS
} from "../Constants/OrderConstants";
import { getListCart } from "./CartActions";

export const createOrder = (customer_id, list_carts, cost, total_price, code_promotion, address, phone) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        // Delete old order
        document.cookie = `${process.env.REACT_APP_ORDER}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let inputData = {
            customer_id, list_carts, cost, total_price, code_promotion, address, phone
        }

        let { data } = await axios.post(listAPIs.CREATE_ORDER, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data.data
            });

            const now = new Date();
            now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
            let order = {
                _id: data.data._id,
            }
            const cookieOrder = `${process.env.REACT_APP_ORDER}=${encodeURIComponent(JSON.stringify(order))}; expires=${now.toUTCString()}; path=/`;
            document.cookie = cookieOrder;
        } else {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getOrderWaiting = (id_customer) => async (dispatch) => {
    try {
        dispatch({ type: GET_ORDER_WAITING_REQUEST });

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        const getOrderCookie = Cookies.get(process.env.REACT_APP_ORDER);
        const id_order = JSON.parse(getOrderCookie)._id;
        let inputData = {
            id_customer,
            id_order
        }

        let { data } = await axios.post(listAPIs.GET_WAITING_ORDER, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: GET_ORDER_WAITING_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: GET_ORDER_WAITING_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ORDER_WAITING_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const payOrder = (id_order, customer_id, is_paid, payment_type) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST });

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let inputData = {
            id_order,
            customer_id,
            is_paid,
            payment_type
        }

        let { data } = await axios.patch(listAPIs.ORDER_PAY, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: ORDER_PAY_SUCCESS,
                payload: data.data
            })
            toast.success("Đặt hàng thành công!", {
                autoClose: 3000
            })
        } else {
            dispatch({
                type: ORDER_PAY_FAIL,
                payload: data.message
            })
        }
        dispatch(getListCart(customer_id))
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const reOrderAction = (id_customer, id_order) => async (dispatch) => {
    try {
        dispatch({ type: RE_ORDER_REQUEST });

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let inputData = {
            id_customer, id_order
        }

        let { data } = await axios.post(listAPIs.RE_ORDER, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: RE_ORDER_SUCCESS,
                payload: data.data
            });
        } else {
            dispatch({
                type: RE_ORDER_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: RE_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
import {
    GET_ORDER_WAITING_FAIL, GET_ORDER_WAITING_REQUEST, GET_ORDER_WAITING_SUCCESS,
    ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS,
    ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS,
    RE_ORDER_FAIL, RE_ORDER_REQUEST, RE_ORDER_RESET, RE_ORDER_SUCCESS
} from "../Constants/OrderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { ...state, loading: true }
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: null
            }
        case ORDER_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ORDER_CREATE_RESET:
            return {}

        case GET_ORDER_WAITING_REQUEST:
            return { ...state, loading: true }
        case GET_ORDER_WAITING_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: null
            }
        case GET_ORDER_WAITING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state;
    }
}

export const reOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case RE_ORDER_REQUEST:
            return {
                loading: true
            }
        case RE_ORDER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                isSuccess: true
            }
        case RE_ORDER_FAIL:
            return {
                loading: false,
                data: null,
                isSuccess: false,
                error: action.payload
            }
        case RE_ORDER_RESET:
            return {}
        default:
            return state;
    }
}
import {
    GET_INFO_PRODUCT_FAIL,
    GET_INFO_PRODUCT_REQUEST,
    GET_INFO_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_TYPE_FAIL, PRODUCT_TYPE_REQUEST, PRODUCT_TYPE_SUCCESS
} from "../Constants/ProductConstants";

export const productListReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                payload: action.payload
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                list_products: action.payload
            }
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const productDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                detail: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const productTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_TYPE_REQUEST:
            return {
                ...state,
                loading: true,
                listProducts: action.payload
            }
        case PRODUCT_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                type: action.payload.type,
                listProducts: action.payload.list_products
            }
        case PRODUCT_TYPE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const infoProductReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_INFO_PRODUCT_REQUEST:
            return {
                loading: true,
                info: [],
            }
        case GET_INFO_PRODUCT_SUCCESS:
            return {
                loading: false,
                info: action.payload
            }
        case GET_INFO_PRODUCT_FAIL:
            return {
                loading: false,
                info: [],
                error: action.payload
            }
        default:
            return state;
    }
}
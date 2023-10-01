import {
    ADD_CART_REQUEST, ADD_CART_SUCCESS, ADD_CART_FAIL,
    GET_LIST_CART_FAIL, GET_LIST_CART_REQUEST, GET_LIST_CART_SUCCESS,
    REMOVE_ITEM_CART_FAIL, REMOVE_ITEM_CART_REQUEST, REMOVE_ITEM_CART_SUCCESS,
    UPDATE_SELECTED_SUCCESS, UPDATE_QUANTITY_FAIL, UPDATE_QUANTITY_REQUEST, UPDATE_QUANTITY_SUCCESS, UPDATE_SELECTED_REQUEST, UPDATE_SELECTED_FAIL
} from "../Constants/CartConstant";

export const listCartsReducer = (state = { list_carts: [] }, action) => {
    switch (action.type) {
        case GET_LIST_CART_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_LIST_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                list_carts: [
                    ...action.payload
                ]
            }
        case GET_LIST_CART_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADD_CART_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADD_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                list_carts: action.payload,
            }
        case ADD_CART_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_SELECTED_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_SELECTED_SUCCESS:
            return {
                ...state,
                loading: false,
                list_carts: action.payload
            }
        case UPDATE_SELECTED_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case REMOVE_ITEM_CART_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case REMOVE_ITEM_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                list_carts: state.list_carts.filter((itemA) => !action.payload.some((itemB) => itemB.product_id === itemA.product_id))
            }
        case REMOVE_ITEM_CART_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_QUANTITY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_QUANTITY_SUCCESS:
            state.list_carts.forEach((item) => {
                if (item._id === action.payload._id) {
                    item.quantity = action.payload.quantity
                }
            })
            return {
                ...state,
                loading: false,
                list_carts: state.list_carts
            }
        case UPDATE_QUANTITY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

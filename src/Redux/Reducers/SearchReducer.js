import { SEARCH_PRODUCT_FAIL, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS } from "../Constants/SearchConstants"

export const searchProductReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SEARCH_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                list_results: action.payload
            }
        case SEARCH_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
import { GET_PROMOTION_FAIL, GET_PROMOTION_REQUEST, GET_PROMOTION_SUCCESS } from "../Constants/PromotionConstants"

export const listPromotionsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PROMOTION_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case GET_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list_promotions: action.payload,
            }
        case GET_PROMOTION_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        default:
            return state
    }
}
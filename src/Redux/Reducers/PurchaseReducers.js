import { CANCEL_PURCHASE_FAIL, CANCEL_PURCHASE_REQUEST, CANCEL_PURCHASE_SUCCESS, FEEDBACK_PURCHASE_FAIL, FEEDBACK_PURCHASE_REQUEST, FEEDBACK_PURCHASE_SUCCESS, GET_LIST_PURCHASE_FAIL, GET_LIST_PURCHASE_REQUEST, GET_LIST_PURCHASE_SUCCESS, RESET_CANCEL_PURCHASE, RESET_FEEDBACK_PURCHASE, UPDATE_LIST_PURCHASE } from "../Constants/PurchaseConstants"

export const listPurchasesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_LIST_PURCHASE_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case GET_LIST_PURCHASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list_purchases: action.payload,
                errMessage: null
            }
        case GET_LIST_PURCHASE_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        case UPDATE_LIST_PURCHASE:
            let temp_listPurchase = [...state.list_purchases];
            temp_listPurchase[action.payload.index] = action.payload.newPurchase;
            return {
                ...state,
                list_purchases: temp_listPurchase
            }
        default:
            return state
    }
}

export const cancelPurchaseReducer = (state = {}, action) => {
    switch (action.type) {
        case CANCEL_PURCHASE_REQUEST:
            return {
                isLoading: true,
            }
        case CANCEL_PURCHASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                purchaseCancel: action.payload.data,
                message: action.payload.message
            }
        case CANCEL_PURCHASE_FAIL:
            return {
                ...state,
                isLoading: false,
                purchaseCancel: null,
                message: action.payload.message
            }
        case RESET_CANCEL_PURCHASE:
            return {
                isLoading: false,
            }
        default:
            return state
    }
}

export const feedbackPurchaseReducer = (state = {}, action) => {
    switch (action.type) {
        case FEEDBACK_PURCHASE_REQUEST:
            return {
                isLoading: true,
            }
        case FEEDBACK_PURCHASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                purchaseFeedback: action.payload.data,
                message: action.payload.message
            }
        case FEEDBACK_PURCHASE_FAIL:
            return {
                ...state,
                isLoading: false,
                purchaseFeedback: null,
                message: action.payload.message
            }
        case RESET_FEEDBACK_PURCHASE:
            return {
                isLoading: false,
            }
        default:
            return state
    }
}
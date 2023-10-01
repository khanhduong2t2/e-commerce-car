import { CLOSE_CONTACT, SEND_CONTACT_FAIL, SEND_CONTACT_REQUEST, SEND_CONTACT_SUCCESS, SHOW_CONTACT } from "../Constants/ContactConstants";

export const contactReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW_CONTACT:
            return {
                isShow: true
            }
        case CLOSE_CONTACT:
            return {
                isShow: false
            }
        case SEND_CONTACT_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case SEND_CONTACT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true
            }
        case SEND_CONTACT_FAIL:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                errMessage: action.payload
            }
        default:
            return state
    }
}
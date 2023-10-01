import { GET_LIST_CERTIFIED_FAIL, GET_LIST_CERTIFIED_REQUEST, GET_LIST_CERTIFIED_SUCCESS } from "../Constants/CertifiedConstants"

export const certifiedReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_LIST_CERTIFIED_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case GET_LIST_CERTIFIED_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listCertified: action.payload,
            }
        case GET_LIST_CERTIFIED_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        default:
            return state
    }
}
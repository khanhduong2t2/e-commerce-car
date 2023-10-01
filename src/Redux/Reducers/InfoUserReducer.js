import {
    GET_INFO_USER_FAIL, GET_INFO_USER_REQUEST, GET_INFO_USER_SUCCESS,
    GET_SUGGEST_ADDRESS_FAIL, GET_SUGGEST_ADDRESS_REQUEST, GET_SUGGEST_ADDRESS_SUCCESS,
    UPDATE_INFO_USER_FAIL, UPDATE_INFO_USER_REQUEST, UPDATE_INFO_USER_SUCCESS,
    UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS
} from "../Constants/InfoUserConstants"

export const infoUserReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_INFO_USER_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_INFO_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMessage: null,
                info: action.payload
            }
        case GET_INFO_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        case UPDATE_INFO_USER_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_INFO_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMessage: null,
                info: action.payload,
            }
        case UPDATE_INFO_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                updatePassSucceed: true,
                errMessage: null,
            }
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                updatePassSucceed: false,
                errMessage: action.payload
            }
        default:
            return state
    }
}

export const requestAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SUGGEST_ADDRESS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_SUGGEST_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                dataSuggest: action.payload,
                errMessage: null,
            }
        case GET_SUGGEST_ADDRESS_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        default:
            return state
    }
}
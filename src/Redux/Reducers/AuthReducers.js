import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
    SHOW_FORM_LOGIN, CLOSE_FORM_LOGIN, SET_ERROR_LOGIN, CLEAR_ERROR_LOGIN,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    CLEAR_ERROR_REGISTER, SET_ERROR_REGISTER, REMOVE_ERROR_REGISTER, SHOW_FORM_REGISTER, CLOSE_FORM_REGISTER,
    USER_LOGOUT, SHOW_FORM_FORGOT, CLOSE_FORM_FORGOT, SEND_FORGOT_REQUEST, SEND_FORGOT_SUCCESS, SEND_FORGOT_FAIL
} from "../Constants/AuthConstants"

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW_FORM_LOGIN:
            return {
                showFormLogin: true
            }
        case CLOSE_FORM_LOGIN:
            return {
                ...state,
                showFormLogin: false
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                infoUser: action.payload,
                errMessage: null,
            }
        case USER_LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload.lang === "en" ? "Your account or password is incorrect!" : "Tài khoản hoặc mật khẩu chưa đúng !",
                typeError: 1
            }

        case SET_ERROR_LOGIN:
            return {
                ...state,
                errMessage: action.payload.message,
                typeError: action.payload.typeError
            }

        case CLEAR_ERROR_LOGIN:
            return {
                ...state,
                errMessage: null,
                typeError: null
            }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    let newErrMessage = state.errMessage ? state.errMessage : [];
    switch (action.type) {
        case SHOW_FORM_REGISTER:
            return {
                showFormRegister: true
            }
        case CLOSE_FORM_REGISTER:
            return {
                ...state,
                showFormRegister: false
            }
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isRegisSuccess: true,
                errMessage: null
            }
        case USER_REGISTER_FAIL:
            return {
                ...state,
                isLoading: false,
                isRegisSuccess: false,
                errMessage: [
                    {
                        type: action.payload.type,
                        message: action.payload.message,
                        typeError: action.payload.type === 'email' ? 1 : (action.payload.type === 'username' ? 2 : null)
                    }
                ]
            }
        case SET_ERROR_REGISTER:
            const index = newErrMessage.findIndex((item) => item.type === action.payload.type);

            if (index !== -1) {
                newErrMessage[index] = action.payload;
            } else {
                newErrMessage.push(action.payload);
            }

            return {
                ...state,
                isLoading: false,
                isRegisSuccess: false,
                errMessage: newErrMessage
            }
        case REMOVE_ERROR_REGISTER:
            let newArray = newErrMessage.filter((item) => item.type !== action.payload.type)
            return {
                ...state,
                isLoading: false,
                isRegisSuccess: false,
                errMessage: newArray
            }
        case CLEAR_ERROR_REGISTER:
            return {
                ...state,
                errMessage: null
            }
        default:
            return state
    }
}

export const forgotPassReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW_FORM_FORGOT:
            return {
                showFormForgot: true
            }
        case CLOSE_FORM_FORGOT:
            return {
                ...state,
                showFormForgot: false
            }
        case SEND_FORGOT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
            }
        case SEND_FORGOT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        case SEND_FORGOT_FAIL:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
                errMessage: action.payload,
            }
        default:
            return state
    }
}
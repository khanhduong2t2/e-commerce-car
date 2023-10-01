import axios from 'axios';
import { toast } from 'react-toastify';
import { listAPIs } from './API/ListAPIs';
import {
    CLOSE_FORM_FORGOT, CLOSE_FORM_LOGIN, CLOSE_FORM_REGISTER, SEND_FORGOT_FAIL, SEND_FORGOT_REQUEST, SEND_FORGOT_SUCCESS, USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS
} from '../Constants/AuthConstants';
export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        let { data } = await axios.post(listAPIs.LOGIN, { username, password }, config);
        if (data.status && data.data && data.data.accessToken && data.data.refreshToken) {
            const now = new Date();
            now.setTime(now.getTime() + 24 * 60 * 60 * 1000);

            let access_data = {
                token: data.data.accessToken.token,
                expires_in: data.data.accessToken.expires_in
            }
            const cookieAccessToken = `accessToken=${encodeURIComponent(JSON.stringify(access_data))}; expires=${now.toUTCString()}; path=/`;
            document.cookie = cookieAccessToken;

            let refresh_data = {
                token: data.data.refreshToken.token,
                expires_in: data.data.refreshToken.expires_in
            }
            const cookieRefreshToken = `refreshToken=${encodeURIComponent(JSON.stringify(refresh_data))}; expires=${now.toUTCString()}; path=/`;
            document.cookie = cookieRefreshToken;

            const localUser = {
                id: data.data.info.id,
                username: data.data.info.username,
                expiration: new Date().getTime() + 24 * 60 * 60 * 1000,
            };
            localStorage.setItem("info", JSON.stringify(localUser))

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data.data.info
            })
            dispatch({ type: CLOSE_FORM_LOGIN })
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    dispatch({
        type: USER_LOGOUT
    });

    localStorage.removeItem('info');
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const register = (email, username, password, confirmPassword) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const inputData = {
            email, username, password, confirmPassword
        }
        let { data } = await axios.post(listAPIs.REGISTER, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data
            })
            dispatch({ type: CLOSE_FORM_REGISTER })
            toast.success('Đăng ký thành công! Vui lòng xác thực email của bạn')
        } else {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: data
            })
        }
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const forgotPassAction = (email, lang) => async (dispatch) => {
    try {
        dispatch({ type: SEND_FORGOT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "lang": lang
            }
        }
        let { data } = await axios.post(listAPIs.FORGOT_PASSWORD, { "email": email }, config);
        if (data.status && data.data) {
            dispatch({
                type: SEND_FORGOT_SUCCESS,
            })
            dispatch({ type: CLOSE_FORM_FORGOT })

            let message = lang === 'en' ? "Succeed. Please check your email !" : "Thành công. Vui lòng kiểm tra email !"
            toast.success(message, {
                autoClose: 3000,
            })
        } else {
            dispatch({
                type: SEND_FORGOT_FAIL,
                payload: {
                    errCode: data.errCode,
                    message: data.message,
                }
            })

            if (data.errCode && data.errCode === 4001) {
                toast.warning(data.message, {
                    autoClose: 3000,
                })
            }

            if (data.errCode && data.errCode === 4002) {
                toast.error(data.message, {
                    autoClose: 3000,
                })
            }
        }
    } catch (error) {
        dispatch({
            type: SEND_FORGOT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
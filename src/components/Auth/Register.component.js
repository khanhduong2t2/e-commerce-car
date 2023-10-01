import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../Redux/Actions/AuthActions';
import { CLOSE_FORM_REGISTER, REMOVE_ERROR_REGISTER, SET_ERROR_REGISTER } from '../../Redux/Constants/AuthConstants';

export default function Register() {
    let dispatch = useDispatch();

    let [email, setEmail] = useState('');
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    const userRegister = useSelector(state => state.userRegister);
    let { showFormRegister, errMessage } = userRegister;

    const handleChangeInput = (e, type) => {
        switch (type) {
            case 'email':
                return setEmail(e.target.value);
            case 'username':
                return setUsername(e.target.value);
            case 'password':
                return setPassword(e.target.value);
            case 'confirmPassword':
                return setConfirmPassword(e.target.value);
            default:
                break;
        }
    }

    const handleOnBlur = (type) => {
        switch (type) {
            case "email":
                dispatch({ type: REMOVE_ERROR_REGISTER, payload: { type: 'email' } })
                return
            case "username":
                dispatch({ type: REMOVE_ERROR_REGISTER, payload: { type: 'username' } })
                return
            case "password":
                dispatch({ type: REMOVE_ERROR_REGISTER, payload: { type: 'password' } })
                return
            case "confirmPassword":
                dispatch({ type: REMOVE_ERROR_REGISTER, payload: { type: 'confirmPassword' } })
                return
            default:
                break;
        }
    }

    const handleOnClickRegister = () => {
        const usernamePattern = /^[a-zA-Z0-9]{6,20}$/;
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        let allValid = true;

        // Email
        if (!email) {
            dispatch({
                type: SET_ERROR_REGISTER,
                payload: {
                    type: 'email',
                    message: 'Vui lòng nhập email !',
                    typeError: 1
                }
            })
            allValid = false;
        }
        if (email && !emailPattern.test(email)) {
            dispatch({
                type: SET_ERROR_REGISTER,
                payload: {
                    type: 'email',
                    message: 'Email không hợp lệ !',
                    typeError: 1
                }
            })
            allValid = false;
        }

        // Username
        if (!username) {
            dispatch({
                type: SET_ERROR_REGISTER,
                payload: {
                    type: 'username',
                    message: 'Vui lòng nhập tên tài khoản !',
                    typeError: 2
                }
            })
            allValid = false;
        }
        if (username && (!usernamePattern.test(username) || username.includes(' '))) {
            dispatch({
                type: SET_ERROR_REGISTER,
                payload: {
                    type: 'username',
                    message: 'Tên tài khoản phải hơn 6 kí tự, không chứa khoảng trắng !',
                    typeError: 2
                }
            })
            allValid = false;
        }

        // Password
        if (password && !passwordPattern.test(password)) {
            dispatch({
                type: SET_ERROR_REGISTER,
                payload: {
                    type: 'password',
                    message: `Mật khẩu phải gồm kí tự: Hoa, thường và số !`,
                    typeError: 3
                }
            })
            allValid = false;
        }
        if (!password) {
            dispatch({
                type: SET_ERROR_REGISTER,
                payload: {
                    type: 'password',
                    message: 'Vui lòng nhập mật khẩu !',
                    typeError: 3
                }
            })
            allValid = false;
        }

        // Confirm Password
        if (confirmPassword && confirmPassword !== password) {
            dispatch({
                type: SET_ERROR_REGISTER,
                payload: {
                    type: 'confirmPassword',
                    message: 'Mật khẩu xác thực không hợp lệ !',
                    typeError: 4
                }
            })
            allValid = false;
        }
        if (!confirmPassword) {
            dispatch({
                type: SET_ERROR_REGISTER,
                payload: {
                    type: 'confirmPassword',
                    message: 'Vui lòng nhập mật khẩu xác thực !',
                    typeError: 4
                }
            })
            allValid = false;
        }

        // End
        if (allValid && email && username && password && confirmPassword) {
            dispatch(register(email, username, password, confirmPassword))
        }
    }

    const handleCloseForm = (e) => {
        if (e.target.className === "container-form") {
            dispatch({ type: CLOSE_FORM_REGISTER })
        }
    }

    return (
        <>
            {
                showFormRegister &&
                <div className="container-form" onClick={(e) => handleCloseForm(e)}>
                    <Form className="form-register">
                        <h3>Đăng ký</h3>
                        <label htmlFor="email">
                            <span>Email</span>
                            {
                                errMessage && errMessage.length > 0 &&
                                errMessage.map((item, index) => {
                                    if (item.typeError === 1) {
                                        return (
                                            <i key={index}>*{item.message}</i>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </label>
                        <input id="email" defaultValue={email} onChange={(e) => handleChangeInput(e, 'email')}
                            onFocus={() => handleOnBlur('email')}
                            type="text" placeholder="Email đăng ký" />
                        <label htmlFor="username">
                            <span>Tên tài khoản</span>
                            {
                                errMessage && errMessage.length > 0 &&
                                errMessage.map((item, index) => {
                                    if (item.typeError === 2) {
                                        return (
                                            <i key={index}>*{item.message}</i>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </label>
                        <input id="username" defaultValue={username} onChange={(e) => handleChangeInput(e, 'username')}
                            onFocus={() => handleOnBlur('username')}
                            type="text" placeholder="Tên tài khoản" />
                        <label htmlFor="password">
                            <span>Mật khẩu</span>
                            {
                                errMessage && errMessage.length > 0 &&
                                errMessage.map((item, index) => {
                                    if (item.typeError === 3) {
                                        return (
                                            <i key={index}>*{item.message}</i>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </label>
                        <input id="password" defaultValue={password} onChange={(e) => handleChangeInput(e, 'password')}
                            onFocus={() => handleOnBlur('password')}
                            type="password" placeholder="Mật khẩu"></input>
                        <label htmlFor="confirmPassword">
                            <span>Nhập lại mật khẩu</span>
                            {
                                errMessage && errMessage.length > 0 &&
                                errMessage.map((item, index) => {
                                    if (item.typeError === 4) {
                                        return (
                                            <i key={index}>*{item.message}</i>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </label>
                        <input id="confirmPassword" defaultValue={confirmPassword} onChange={(e) => handleChangeInput(e, 'confirmPassword')}
                            onFocus={() => handleOnBlur('confirmPassword')}
                            type="password" placeholder="Xác nhận mật khẩu"></input>
                        <button onClick={() => handleOnClickRegister()}
                            type="button" className="btn-register">Đăng ký</button>
                    </Form>
                </div>
            }
        </>
    )
}

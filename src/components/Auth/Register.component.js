import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Redux/Actions/AuthActions';
import { CLOSE_FORM_REGISTER, REMOVE_ERROR_REGISTER, SET_ERROR_REGISTER } from '../../Redux/Constants/AuthConstants';

export default function Register() {
    let dispatch = useDispatch();

    let [email, setEmail] = useState('');
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    const language = useSelector(state => state.language);
    let { lang } = language;

    const userRegister = useSelector(state => state.userRegister);
    let { showFormRegister, errMessage, isLoading } = userRegister;

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
                    message: lang === "en" ? 'Please enter email!' : 'Vui lòng nhập email !',
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
                    message: lang === "en" ? 'Invalid email !' : 'Email không hợp lệ !',
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
                    message: lang === "en" ? 'Please enter your account name !' : 'Vui lòng nhập tên tài khoản !',
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
                    message: lang === "en" ?
                        'Account name must be more than 6 characters, contain no spaces!' : 'Tên tài khoản phải hơn 6 kí tự, không chứa khoảng trắng !',
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
                    message: lang === "en" ? `Password must contain characters: Uppercase, lowercase and numbers!` : `Mật khẩu phải gồm kí tự: Hoa, thường và số !`,
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
                    message: lang === "en" ? 'Please enter a password !' : 'Vui lòng nhập mật khẩu !',
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
                    message: lang === "en" ? 'Invalid authentication password!' : 'Mật khẩu xác thực không hợp lệ !',
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
                    message: lang === "en" ? 'Please enter authentication password!' : 'Vui lòng nhập mật khẩu xác thực !',
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
                        <h3>{lang === 'en' ? 'Sign up' : 'Đăng ký'}</h3>
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
                            type="text" placeholder={lang === "en" ?
                                "Email registration" : "Email đăng ký"} />
                        <label htmlFor="username">
                            <span>{lang === "en" ? "Username" : "Tên tài khoản"}</span>
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
                            type="text" placeholder={lang === "en" ? "Username" : "Tên tài khoản"} />
                        <label htmlFor="password">
                            <span>{lang === "en" ? "Password" : "Mật khẩu"}</span>
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
                            type="password" placeholder={lang === "en" ? "Password" : "Mật khẩu"}></input>
                        <label htmlFor="confirmPassword">
                            <span>{lang === "en" ? "Confirm password" : "Nhập lại mật khẩu"}</span>
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
                            type="password" placeholder={lang === "en" ? "Confirm password" : "Xác nhận mật khẩu"}></input>
                        {isLoading ?
                            <Spinner animation="border" variant="primary" />
                            :
                            <button onClick={() => handleOnClickRegister()}
                                type="button" className="btn-register">{lang === "en" ? "Sign up" : "Đăng ký"}</button>
                        }
                    </Form>
                </div>
            }
        </>
    )
}

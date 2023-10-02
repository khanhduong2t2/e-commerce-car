import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { textLanguage } from '../../util/text_language';
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

    let content = lang === "en" ? textLanguage.EN : textLanguage.VI;

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
                    message: content.require_email,
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
                    message: content.invalid_email,
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
                    message: content.require_username,
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
                    message: content.invalid_username,
                    typeError: 2
                }
            })
            allValid = false;
        }

        // Password
        if (!password) {
            dispatch({
                type: SET_ERROR_REGISTER,
                payload: {
                    type: 'password',
                    message: content.require_password,
                    typeError: 3
                }
            })
            allValid = false;
        }
        if (password && !passwordPattern.test(password)) {
            dispatch({
                type: SET_ERROR_REGISTER,
                payload: {
                    type: 'password',
                    message: content.invalid_password,
                    typeError: 3
                }
            })
            allValid = false;
        }

        // Confirm Password
        if (!confirmPassword) {
            dispatch({
                type: SET_ERROR_REGISTER,
                payload: {
                    type: 'confirmPassword',
                    message: content.require_confirm_pw,
                    typeError: 4
                }
            })
            allValid = false;
        }
        if (confirmPassword && confirmPassword !== password) {
            dispatch({
                type: SET_ERROR_REGISTER,
                payload: {
                    type: 'confirmPassword',
                    message: content.invalid_confirm_pw,
                    typeError: 4
                }
            })
            allValid = false;
        }

        // End
        if (allValid && email && username && password && confirmPassword) {
            dispatch(register(email, username, password, confirmPassword, lang))
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
                        <h3>
                            {content.title_signup}<strong style={{ "fontSize": "46px" }}> E-Car</strong>
                        </h3>
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
                            type="text" placeholder={content.holder_email} />
                        <label htmlFor="username">
                            <span>{content.holder_username}</span>
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
                            type="text" placeholder={content.holder_username} />
                        <label htmlFor="password">
                            <span>{content.holder_password}</span>
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
                            type="password" placeholder={content.holder_password}></input>
                        <label htmlFor="confirmPassword">
                            <span>{content.holder_confirm_pw}</span>
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
                            type="password" placeholder={content.holder_confirm_pw}></input>

                        {isLoading ?
                            <div style={{ "width": "100%", "display": "flex", "justifyContent": "center", "marginTop": "20px" }}>
                                <Spinner animation="border" variant="primary" />
                            </div>
                            :
                            <button onClick={() => handleOnClickRegister()}
                                type="button" className="btn-register">{content.btn_signup}</button>
                        }
                    </Form>
                </div>
            }
        </>
    )
}

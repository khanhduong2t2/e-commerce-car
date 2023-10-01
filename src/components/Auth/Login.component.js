import React, { useState } from 'react';

import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../Redux/Actions/AuthActions';
import { CLEAR_ERROR_LOGIN, CLOSE_FORM_LOGIN, SET_ERROR_LOGIN, SHOW_FORM_FORGOT } from '../../Redux/Constants/AuthConstants';

import { textLanguage } from '../../util/text_language';
export default function Login() {
    let dispatch = useDispatch();

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const language = useSelector(state => state.language)
    let { lang } = language;
    let content = lang === "en" ? textLanguage.EN : textLanguage.VI;

    const userLogin = useSelector(state => state.userLogin)
    let { showFormLogin, errMessage, typeError } = userLogin;

    const handleChangeInput = (e, type) => {
        switch (type) {
            case 'username':
                return setUsername(e.target.value);
            case 'password':
                return setPassword(e.target.value);
            default:
                break;
        }
    }

    const onClearError = () => {
        dispatch({ type: CLEAR_ERROR_LOGIN });
    }

    const handleOnClickLogin = () => {
        if (!username) {
            dispatch({
                type: SET_ERROR_LOGIN, payload: {
                    message: "Vui lòng điền đầy đủ thông tin !",
                    typeError: 1
                }
            })
        } else if (!password) {
            dispatch({
                type: SET_ERROR_LOGIN, payload: {
                    message: "Vui lòng điền đầy đủ thông tin !",
                    typeError: 2
                }
            })
        } else {
            dispatch(login(username, password))
        }
    }

    const handleCloseForm = (e) => {
        if (e.target.className === "container-form") {
            dispatch({ type: CLOSE_FORM_LOGIN })
        }
    }

    const handleShowForgot = () => {
        dispatch({ type: CLOSE_FORM_LOGIN })
        dispatch({ type: SHOW_FORM_FORGOT })
    }

    return (
        <>
            {
                showFormLogin &&
                <div className="container-form" onClick={(e) => handleCloseForm(e)}>
                    <Form className="form-login">
                        <h3>{content.title_login}<strong style={{ "fontSize": "46px" }}> E-Car</strong></h3>
                        <label htmlFor="username">
                            {content.label_account}
                            {
                                errMessage && typeError === 1 &&
                                <i>*{errMessage}</i>
                            }
                        </label>
                        <input id="username" defaultValue={username}
                            onChange={(e) => handleChangeInput(e, 'username')}
                            onFocus={() => onClearError()}
                            type="text" placeholder={content.textarea_account} />
                        <label htmlFor="password">
                            {content.label_password}
                            {
                                errMessage && typeError === 2 &&
                                <i>*{errMessage}</i>
                            }
                        </label>
                        <input id="password" defaultValue={password}
                            onChange={(e) => handleChangeInput(e, 'password')}
                            onFocus={() => onClearError()}
                            type="password" placeholder={content.label_password}></input>
                        <button onClick={() => handleOnClickLogin()}
                            type="button">{content.login}</button>
                        <p className="text-forgot" onClick={() => handleShowForgot()}>{content.forgot_password}</p>
                    </Form>
                </div>
            }
        </>
    )
}

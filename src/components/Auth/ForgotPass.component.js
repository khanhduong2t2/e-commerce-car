import { Form } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_FORM_FORGOT } from '../../Redux/Constants/AuthConstants';
import { forgotPassAction } from '../../Redux/Actions/AuthActions';

export default function ForgotPass() {
    let dispatch = useDispatch();

    let [email, setEmail] = useState('');

    const forgotPassword = useSelector(state => state.forgotPassword)
    let { showFormForgot } = forgotPassword;

    const handleChangeInput = (e, type) => {
        switch (type) {
            case 'email':
                return setEmail(e.target.value);
            default:
                break;
        }
    }

    const handleCloseForm = (e) => {
        if (e.target.className === "container-form") {
            dispatch({ type: CLOSE_FORM_FORGOT })
        }
    }

    const handleOnClickForgot = () => {
        let lang = "vi";
        dispatch(forgotPassAction(email, lang))
    }

    return (
        <>
            {
                showFormForgot &&
                <div className="container-form" onClick={(e) => handleCloseForm(e)}>
                    <Form className="form-login">
                        <label htmlFor="email">Nhập email</label>
                        <input id="email" defaultValue={email}
                            onChange={(e) => handleChangeInput(e, 'email')}
                            type="email" placeholder="Email" />
                        <button onClick={() => handleOnClickForgot()}
                            type="button">Lấy lại mật khẩu</button>
                    </Form>
                </div>
            }
        </>
    )
}

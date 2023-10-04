import { connect } from 'react-redux';
import React, { Component } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import IconCart from '../Cart/IconCart.component';

import { logout } from '../../Redux/Actions/AuthActions';
import { SHOW_FORM_LOGIN, SHOW_FORM_REGISTER } from '../../Redux/Constants/AuthConstants';

// import Login from './Login.component';
// import Register from './Register.component';
// import ForgotPass from './ForgotPass.component';
import { NavLink } from 'react-router-dom';

class Auth extends Component {
    handleShowLogin = () => {
        this.props.showFormLogin();
    }

    handleShowRegister = () => {
        this.props.showFormRegister();
    }

    handleOnClickLogout = () => {
        this.props.userLogoutAction();
    }
    render() {
        let { lang } = this.props.language;
        // let { showFormRegister } = this.props.userRegister;
        // let { showFormForgot } = this.props.forgotPassword;
        // let { showFormLogin } = this.props.userLogin;
        let { infoUser } = this.props.userLogin;
        return (
            <div id="login-logout">
                {
                    infoUser && infoUser.username ?
                        <>
                            {/* <DropdownButton className="name-user" id="dropdown-basic-button" title={infoUser.username}> */}
                            <DropdownButton className="name-user" title={infoUser.username}>
                                <NavLink to="/change-info" activeclassname="active">
                                    {lang === "en" ? "Change information" : "Thay đổi thông tin"}
                                </NavLink>
                                <NavLink to="/my-purchase" activeclassname="active">
                                    {lang === "en" ? "My purchase" : "Đơn hàng"}
                                </NavLink>
                                <Dropdown.Item onClick={() => this.handleOnClickLogout()}>
                                    {lang === "en" ? "Logout" : "Đăng xuất"}
                                </Dropdown.Item>
                            </DropdownButton>

                            <IconCart id_user={infoUser.id}></IconCart>
                        </>
                        :
                        <>
                            <p className="login" onClick={() => this.handleShowLogin()}>{lang === "en" ? "Sign in" : "Đăng nhập"}</p>
                            <p className="signup" onClick={() => this.handleShowRegister()}>{lang === "en" ? "Sign up" : "Đăng kí"}</p>
                        </>
                }
                {/* {
                    showFormLogin && <Login></Login>
                }
                {
                    showFormRegister && <Register></Register>
                }
                {
                    showFormForgot && <ForgotPass></ForgotPass>
                } */}
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.language,
        userLogin: state.userLogin,
        // userRegister: state.userRegister,
        // forgotPassword: state.forgotPassword,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogoutAction: () => dispatch(logout()),
        showFormLogin: () => dispatch({ type: SHOW_FORM_LOGIN }),
        showFormRegister: () => dispatch({ type: SHOW_FORM_REGISTER })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
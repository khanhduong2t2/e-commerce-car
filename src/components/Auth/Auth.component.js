import { connect } from 'react-redux';
import React, { Component } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import IconCart from '../Cart/IconCart.component';

import { logout } from '../../Redux/Actions/AuthActions';
import { SHOW_FORM_LOGIN, SHOW_FORM_REGISTER } from '../../Redux/Constants/AuthConstants';

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

    handleCloseMenu = () => {
        let onCloseMenu = this.props.onCloseMenu;
        if (onCloseMenu) {
            onCloseMenu()
        }
    }
    render() {
        let { lang } = this.props.language;
        let { infoUser } = this.props.userLogin;
        return (
            <div id="login-logout">
                {
                    infoUser && infoUser.username ?
                        <>
                            <DropdownButton className="name-user" title={infoUser.username}>
                                <NavLink to="/change-info" activeclassname="active"
                                    onClick={() => this.handleCloseMenu()}
                                >
                                    {lang === "en" ? "Change information" : "Thay đổi thông tin"}
                                </NavLink>
                                <NavLink to="/my-purchase" activeclassname="active"
                                    onClick={() => this.handleCloseMenu()}
                                >
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
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.language,
        userLogin: state.userLogin,
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
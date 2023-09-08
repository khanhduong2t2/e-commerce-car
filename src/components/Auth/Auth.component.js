import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
class Auth extends Component {
    state = {
        isShowLogin: false,
        isShowRegister: false,
        isShowContainer: false
    }

    handleShowLogin = () => {
        this.setState({ isShowLogin: true, isShowRegister: false, isShowContainer: true })
    }

    handleShowRegister = () => {
        this.setState({ isShowLogin: false, isShowRegister: true, isShowContainer: true })
    }

    handleCloseForm = (e) => {
        if (e.target.className === "container-form") {
            this.setState({ isShowLogin: false, isShowRegister: false, isShowContainer: false })
        }
    }
    render() {
        let { isShowLogin, isShowRegister, isShowContainer } = this.state;
        return (
            <div id="login-logout">
                <p className="login" onClick={() => this.handleShowLogin()}>Đăng nhập</p>
                <p className="logout" onClick={() => this.handleShowRegister()}> Đăng kí</p>

                {
                    isShowContainer &&
                    <div className="container-form" onClick={(e) => this.handleCloseForm(e)}>
                        {
                            isShowLogin &&
                            <Form className="form-login">
                                <input type="text" placeholder="Tên tài khoản" />
                                <input type="password" placeholder="Mật khẩu"></input>
                                <button type="button">Đăng nhập</button>
                                <p>Đăng nhập bằng tài khoản email ?</p>
                            </Form>
                        }
                        {
                            isShowRegister &&
                            <Form className="form-register">
                                <input type="text" placeholder="Email đăng ký" />
                                <input type="text" placeholder="Tên tài khoản" />
                                <input type="password" placeholder="Mật khẩu"></input>
                                <input type="password" placeholder="Xác nhận mật khẩu"></input>
                                <button type="button">Đăng ký</button>
                            </Form>
                        }
                    </div>
                }
            </div >
        );
    }
}

export default Auth;
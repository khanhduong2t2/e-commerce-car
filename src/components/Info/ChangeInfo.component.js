import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoUser, updateInfoUser, updatePassword } from '../../Redux/Actions/InfoUserActions';
import { isNonEmptyString } from '../../helpers/check_valid';
export default function ChangeInfo() {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    let { infoUser } = userLogin;

    const userInfo = useSelector(state => state.userInfo);
    let { info } = userInfo;

    let [phone, setPhone] = useState('');
    let [address, setAddress] = useState('');
    let [password, setPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    let [isNoChange, setIsNoChange] = useState(false);
    let [isIncomplete, setIsIncomplete] = useState(false);
    let [isInvalidNewPass, setIsInvalidNewPass] = useState(false);
    let [isInvalidConfirmPass, setIsInvalidConfirmPass] = useState(false);

    useEffect(() => {
        if (infoUser && infoUser.id) {
            dispatch(getInfoUser(infoUser.id))
        }
    }, [dispatch, infoUser])

    useEffect(() => {
        if (info) {
            setPhone(info.phone)
            setAddress(info.address)
        }
    }, [info])

    const onChangePhone = (e) => {
        setPhone(e.target.value)
        setIsNoChange(false)
    }

    const onChangeAddress = (e) => {
        setAddress(e.target.value)
        setIsNoChange(false)
    }

    const onClickSaveInfo = () => {
        if (phone.trim() === info.phone.trim() && address.trim() === info.address.trim()) {
            setIsNoChange(true)
        } else {
            dispatch(
                updateInfoUser({
                    customer_id: infoUser.id,
                    phone, address
                })
            )
        }
    }

    // Change Password
    const handleChangeInput = (e, type) => {
        switch (type) {
            case "password":
                setIsIncomplete(false)
                setPassword(e.target.value)
                return
            case "newPassword":
                setIsIncomplete(false)
                setIsInvalidNewPass(false)
                setIsInvalidConfirmPass(false)
                setNewPassword(e.target.value)
                return
            case "confirmPassword":
                setIsIncomplete(false)
                setIsInvalidConfirmPass(false)
                setConfirmPassword(e.target.value)
                return
            default:
                break;
        }
    }

    const onClickSavePassword = () => {
        if (!isNonEmptyString(password) || !isNonEmptyString(newPassword) || !isNonEmptyString(confirmPassword)) {
            setIsIncomplete(true)
        } else {
            const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
            if (!passwordPattern.test(newPassword)) {
                setIsInvalidNewPass(true)
            } else if (newPassword !== confirmPassword) {
                setIsInvalidConfirmPass(true)
            } else {
                dispatch(
                    updatePassword({
                        customer_id: infoUser.id,
                        password: password,
                        new_password: newPassword,
                        confirm_password: confirmPassword
                    })
                )
            }

        }
    }

    return (
        <div id="container-info">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row id="tab-info">
                    <Col sm={3} className="container-title">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item className="title-change">
                                <Nav.Link eventKey="first">Thay đổi thông tin</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="title-change">
                                <Nav.Link eventKey="second">Thay đổi mật khẩu</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9} className="container-info">
                        <Tab.Content className="form-info">
                            <Tab.Pane eventKey="first" className="change-info">
                                {
                                    info &&
                                    <>
                                        <div className="item-input">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                id="email"
                                                defaultValue={info.email}
                                                type="text" placeholder="Tài khoản hoặc email"
                                                style={{ "backgroundColor": "#e2e2e2" }}
                                                disabled
                                            />
                                        </div>
                                        <div className="item-input">
                                            <label htmlFor="username">Tài khoản</label>
                                            <input
                                                id="username"
                                                defaultValue={info.username}
                                                type="text" placeholder="Tài khoản hoặc email"
                                                style={{ "backgroundColor": "#e2e2e2" }}
                                                disabled
                                            />
                                        </div>
                                        <div className="item-input">
                                            <label htmlFor="phone">Điện thoại</label>
                                            <input
                                                id="phone"
                                                defaultValue={phone}
                                                onChange={(e) => onChangePhone(e)}
                                                type="text" placeholder="Điện thoại"
                                            />
                                        </div>
                                        <div className="item-input">
                                            <label htmlFor="address">Điạ chỉ</label>
                                            <input
                                                id="address"
                                                defaultValue={address}
                                                onChange={(e) => onChangeAddress(e)}
                                                type="text" placeholder="Điạ chỉ"
                                            />
                                        </div>

                                        <div className="group-btn">
                                            <Button className="btn-save" type="primary" shape="round" size="large"
                                                onClick={() => onClickSaveInfo()}
                                            >
                                                Lưu thay đổi
                                            </Button>
                                            {
                                                isNoChange && <p>Bạn chưa thay đổi thông tin !</p>
                                            }
                                        </div>
                                    </>
                                }

                            </Tab.Pane>
                            <Tab.Pane eventKey="second" className="change-password">
                                <div className="item-input">
                                    <label htmlFor="phone">Mật khẩu cũ</label>
                                    <input
                                        id="phone"
                                        defaultValue={password}
                                        onChange={(e) => handleChangeInput(e, 'password')}
                                        type="text" placeholder="Mật khẩu cũ"
                                    />
                                </div>
                                <div className="item-input">
                                    <label htmlFor="phone">Mật khẩu mới</label>
                                    <input
                                        id="phone"
                                        defaultValue={newPassword}
                                        onChange={(e) => handleChangeInput(e, 'newPassword')}
                                        type="text" placeholder="Mật khẩu mới"
                                    />
                                </div>
                                <div className="item-input">
                                    <label htmlFor="address">Xác nhận mật khẩu mới</label>
                                    <input
                                        id="address"
                                        defaultValue={confirmPassword}
                                        onChange={(e) => handleChangeInput(e, 'confirmPassword')}
                                        type="text" placeholder="Xác nhận mật khẩu mới"
                                    />
                                </div>

                                <div className="group-btn">
                                    <Button className="btn-save" type="primary" shape="round" size="large"
                                        onClick={() => onClickSavePassword()}
                                    >
                                        Lưu thay đổi
                                    </Button>
                                    {
                                        isIncomplete && <p>Vui lòng điền đầy đủ thông tin !</p>
                                    }
                                    {
                                        isInvalidConfirmPass && <p>Xác nhận mật khẩu không hợp lệ !</p>
                                    }
                                    {
                                        isInvalidNewPass &&
                                        <p>
                                            <span>Mật khẩu mới không hợp lệ!</span>
                                            <span>Yêu cầu: Hoa, thường, số và độ dài tối thiều 6 kí tự!</span>
                                        </p>
                                    }
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

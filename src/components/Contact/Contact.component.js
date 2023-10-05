import React, { useEffect, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { sendEmailContact } from '../../Redux/Actions/ContactActions';

export default function Contact() {
    const dispatch = useDispatch();

    let [textName, setName] = useState('');
    let [textPhone, setPhone] = useState('');
    let [textTypeCar, setTypeCar] = useState('');
    let [textContent, setContent] = useState('');

    const language = useSelector(state => state.language);
    let { lang } = language;

    const userLogin = useSelector(state => state.userLogin);
    let { infoUser } = userLogin;

    const contact = useSelector(state => state.contact);
    let { isShow, isLoading, isSuccess } = contact;

    const handleCloseForm = (e) => {
        if (e.target.id === "container-contact") {
            dispatch({ type: "CLOSE_CONTACT" })
        }
    }

    const handleChangeInput = (e, type) => {
        switch (type) {
            case "name":
                return setName(e.target.value)
            case "phone":
                return setPhone(e.target.value)
            case "type_car":
                return setTypeCar(e.target.value)
            case "content":
                return setContent(e.target.value)
            default:
                break;
        }
    }

    const handleOnClickLogin = () => {
        if (!textName.trim() || !textPhone.trim() || ((textTypeCar.trim().length === 0) && (textContent.trim().length === 0))) {
            toast.warning(lang === "en" ? "Please enter all necessary information!" : "Bạn vui lòng nhập đầy đủ thông tin cần thiết !")
        } else if (isNaN(textPhone)) {
            toast.warning(lang === "en" ? "Invalid phone number !" : "Số điện thoại không hợp lệ !")
        } else {
            let data = {
                customer_id: infoUser.id,
                name_register: textName,
                phone_register: textPhone,
                type_car: textTypeCar,
                content: textContent,
                lang: "en"
            }
            dispatch(sendEmailContact(data))
        }
    }

    useEffect(() => {
        if (isShow) {
            if (isLoading === false && isSuccess) {
                toast.success(lang === "en" ? "Success !" : "Thành công !", {
                    autoClose: 3000,
                });

                setName('')
                setPhone('')
                setTypeCar('')
                setContent('')
            } else if (isLoading === false && isSuccess === false) {
                toast.error(lang === "en" ? "Send failed! Please try again later." : "Gửi thất bại! Bạn vui lòng thử lại sau.", {
                    autoClose: 3000,
                })
            }
        }
    }, [isLoading, isShow, isSuccess, lang])

    return (
        <>
            {
                isShow ?
                    <div id="container-contact" onClick={(e) => handleCloseForm(e)} >
                        <Form className="form-contact">
                            <img width="100%" src="https://firebasestorage.googleapis.com/v0/b/save-portfolio.appspot.com/o/portfolio%2Femail.jpg?alt=media&token=4dfef9cf-ce58-441c-beda-6b5e5d67be56" alt="img_try" />
                            <p className="title">{lang === "en" ? "Contact & Test drive the car" : "Liên hệ & Lái thử xe"}</p>
                            <p>{lang === "en" ? "Please enter your information" : "Quý khách hàng vui lòng nhập thông tin"}</p>
                            <input
                                value={textName}
                                onChange={(e) => handleChangeInput(e, "name")}
                                type="text" placeholder={lang === "en" ? "Name" : "Họ và tên"} />
                            <input
                                value={textPhone}
                                onChange={(e) => handleChangeInput(e, "phone")}
                                type="text" placeholder={lang === "en" ? "Phone" : "Số điện thoại"} />
                            <input
                                value={textTypeCar}
                                onChange={(e) => handleChangeInput(e, "type_car")}
                                type="text" placeholder={lang === "en" ? "Car's name (if registering for a test drive)" : "Tên xe (nếu đăng ký lái thử xe)"} />

                            <textarea
                                value={textContent}
                                style={{ overflow: 'hidden' }}
                                onChange={(e) => handleChangeInput(e, "content")}
                                type="text" placeholder={lang === "en" ? "Content" : "Nội dung"} />
                            <button onClick={() => handleOnClickLogin()}
                                type="button">{lang === "en" ? "Send" : "Gửi yêu cầu"}</button>
                        </Form>
                        {
                            isLoading && (
                                <Spinner animation="border" variant="primary" />
                            )
                        }
                    </div >
                    : null
            }
        </>
    )
}

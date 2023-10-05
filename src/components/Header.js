import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { BiChevronDown } from "react-icons/bi";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

import { setLanguageAction } from '../Redux/Actions/LangActions';
import { SHOW_CONTACT } from '../Redux/Constants/ContactConstants';
import { SHOW_FORM_LOGIN } from '../Redux/Constants/AuthConstants';

import Auth from './Auth/Auth.component';
import Login from './Auth/Login.component';
import Register from './Auth/Register.component';
import ForgotPass from './Auth/ForgotPass.component';
import FormSearch from './Search/FormSearch.component';

export default function Header() {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    let { showFormLogin, infoUser } = userLogin;

    const userRegister = useSelector(state => state.userRegister);
    let { showFormRegister } = userRegister;

    const forgotPassword = useSelector(state => state.forgotPassword);
    let { showFormForgot } = forgotPassword;

    const language = useSelector(state => state.language);
    let { lang } = language;

    let [showListBrand, setShowListBrand] = useState(false);
    const ls_item_menu = [
        {
            name_vi: "Thương hiệu",
            name_en: "Brand",
            slug: "/",
            type: "drop"
        },
        {
            name_vi: "Tin tức & Sự kiện",
            name_en: "Offers & Events",
            slug: "/news-events",
            type: "link"
        },
        {
            name_vi: "Chứng nhận",
            name_en: "Certified",
            slug: "/certified",
            type: "link"
        },
        {
            name_vi: "Liên hệ",
            name_en: "Contact",
            slug: "#",
            type: "display"
        },
    ]

    const onShowForm = (e, type) => {
        console.log('onSHowForm')
        e.preventDefault();
        if (infoUser && infoUser.id) {
            if (type === "Contact") {
                dispatch({ type: SHOW_CONTACT })
            }
        } else {
            dispatch({ type: SHOW_FORM_LOGIN })
        }
    }

    const handleChangeLanguage = (language) => {
        dispatch(setLanguageAction(language))
    }

    const handleClickDropBrand = (e) => {
        e.preventDefault();
        setShowListBrand(!showListBrand)
    }


    // Change Width List Menu
    let [widthMenu, setWidthMenu] = useState(50);
    const changeWidthListMenu = (width) => {
        setWidthMenu(width)
    }

    // Hide/Show Button Mobile
    let btnMobile = useRef();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (btnMobile.current) {
            let element = btnMobile.current.querySelector('#dropdown-basic-button');
            const computedStyle = window.getComputedStyle(element);
            let displayStyle = computedStyle.getPropertyValue('display');
            if (displayStyle === "none") {
                setIsMobile(false)
            } else {
                setIsMobile(true)
            }
        }
    }, [btnMobile, windowWidth])

    // Close menu
    const [showDropdown, setShowDropdown] = useState(false);
    const handleCloseMenu = () => {
        setShowDropdown(false);
    }

    const handleCloseDropdown = (isOpen) => {
        setShowDropdown(isOpen);
    };

    return (
        <div id="header-container">
            <NavLink to="/" activeclassname="active" id="logo" exact>
                <img width="129px" src="https://firebasestorage.googleapis.com/v0/b/save-portfolio.appspot.com/o/portfolio%2Flogo.png?alt=media&token=3a9d4bf9-6b31-45e7-a643-2b510c31e863" alt="logo" />
            </NavLink>
            <ul id="list-menu" style={{ "width": widthMenu + "%" }}>
                {
                    ls_item_menu && ls_item_menu.length > 0 &&
                    ls_item_menu.map((item, index) => {
                        return (
                            item.type === "drop" ?
                                <li className="item-menu have-drop" key={item.name_en}>
                                    <NavLink className="item-link" to={item.slug} activeclassname="active" exact>{lang === "en" ? item.name_en : item.name_vi} <BiChevronDown /></NavLink>
                                    <ul id="list-drop-brand">
                                        <li className="item-brand">
                                            <NavLink className="brand-link" to="/product/vinfast" activeclassname="active">
                                                VinFast
                                            </NavLink>
                                        </li>
                                        <li className="item-brand">
                                            <NavLink className="brand-link" to="/product/mercedes" activeclassname="active">
                                                Mercedes
                                            </NavLink>
                                        </li>
                                        <li className="item-brand">
                                            <NavLink className="brand-link" to="/product/tesla" activeclassname="active">
                                                Tesla
                                            </NavLink>
                                        </li>
                                        <li className="item-brand">
                                            <NavLink className="brand-link" to="/product/porsche" activeclassname="active">
                                                Porsche
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                :
                                (widthMenu !== 15)
                                &&
                                (
                                    item.type === "display" ?
                                        <li className="item-menu" key={item.name_en}>
                                            <NavLink className="item-link" to={item.slug} activeclassname="active" exact
                                                onClick={(e) => onShowForm(e, item.name_en)}
                                            >
                                                <span>{lang === "en" ? item.name_en : item.name_vi}</span>
                                            </NavLink>
                                        </li>
                                        :
                                        <li className="item-menu" key={item.name_en}>
                                            <NavLink className="item-link" to={item.slug} activeclassname="active" exact>
                                                <span>{lang === "en" ? item.name_en : item.name_vi}</span>
                                            </NavLink>
                                        </li>
                                )
                        )
                    })
                }
            </ul>

            <FormSearch getWidthListMenu={changeWidthListMenu}></FormSearch>

            {
                !isMobile &&
                <>
                    <Auth></Auth>
                    <div id="languages">
                        <p className="vi" style={lang === "vi" ? { "fontWeight": "900" } : null}
                            onClick={() => handleChangeLanguage('vi')}
                        >VI</p>
                        <p> / </p>
                        <p className="en" style={lang === "en" ? { "fontWeight": "900" } : null}
                            onClick={() => handleChangeLanguage('en')}
                        >EN</p>
                    </div>
                </>
            }

            <DropdownButton show={showDropdown} id="dropdown-basic-button" ref={btnMobile} title=""
                onToggle={(isOpen) => {
                    handleCloseDropdown(isOpen);
                }}
            >
                {
                    ls_item_menu && ls_item_menu.length > 0 &&
                    ls_item_menu.map((item, index) => {
                        return (
                            item.type === "drop" ?
                                <div key={item.name_en}
                                    className="item-link item-link-drop"
                                    onClick={(e) => handleClickDropBrand(e)}
                                >
                                    <span>
                                        {lang === "en" ? item.name_en : item.name_vi}
                                        &nbsp;
                                        {
                                            showListBrand ?
                                                <IoIosArrowDown></IoIosArrowDown>
                                                :
                                                <IoIosArrowForward></IoIosArrowForward>
                                        }
                                    </span>
                                    {
                                        showListBrand &&
                                        <ul id="list-drop-brand">
                                            <li className="item-brand">
                                                <NavLink className="brand-link" to="/product/vinfast" exact activeclassname="active">
                                                    VinFast
                                                </NavLink>
                                            </li>
                                            <li className="item-brand">
                                                <NavLink className="brand-link" to="/product/mercedes" exact activeclassname="active">
                                                    Mercedes
                                                </NavLink>
                                            </li>
                                            <li className="item-brand">
                                                <NavLink className="brand-link" to="/product/tesla" exact activeclassname="active">
                                                    Tesla
                                                </NavLink>
                                            </li>
                                            <li className="item-brand">
                                                <NavLink className="brand-link" to="/product/porsche" exact activeclassname="active">
                                                    Porsche
                                                </NavLink>
                                            </li>
                                        </ul>
                                    }
                                </div>
                                :
                                item.slug === "#" ?
                                    <Dropdown.Item key={item.name_en}
                                        href={item.slug}
                                        onClick={(e) => onShowForm(e, item.name_en)}
                                        className="item-link"
                                    >
                                        <span>{lang === "en" ? item.name_en : item.name_vi}</span>
                                    </Dropdown.Item>
                                    :
                                    <Dropdown.Item key={item.name_en}
                                        href={item.slug}
                                        className="item-link"
                                    >
                                        <span>{lang === "en" ? item.name_en : item.name_vi}</span>
                                    </Dropdown.Item>
                        )
                    })
                }
                <Auth onCloseMenu={handleCloseMenu}></Auth>
                <div id="languages">
                    <p className="vi" style={lang === "vi" ? { "fontWeight": "900" } : null}
                        onClick={() => handleChangeLanguage('vi')}
                    >VI</p>
                    <p> / </p>
                    <p className="en" style={lang === "en" ? { "fontWeight": "900" } : null}
                        onClick={() => handleChangeLanguage('en')}
                    >EN</p>
                </div>
            </DropdownButton>

            {
                showFormLogin && <Login></Login>
            }
            {
                showFormRegister && <Register></Register>
            }
            {
                showFormForgot && <ForgotPass></ForgotPass>
            }
        </div >
    )
}

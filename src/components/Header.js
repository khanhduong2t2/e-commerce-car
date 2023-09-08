import React from 'react'

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiSearch, BiChevronDown } from "react-icons/bi";

import Auth from './Auth/Auth.component';

export default function Header() {
    const ls_item_menu = [
        {
            name_vi: "Thương hiệu",
            name_en: "Brand",
            slug: "/",
            type: "drop"
        },
        {
            name_vi: "Bảng giá",
            name_en: "Price",
            slug: "/price",
            type: "link"
        },
        {
            name_vi: "Ưu đãi & Sự kiện",
            name_en: "Offers & Events",
            slug: "/offers-events",
            type: "link"
        },
        {
            name_vi: "Liên hệ",
            name_en: "Contact",
            slug: "/",
            type: "display"
        },
    ]
    return (
        <div id="header-container">
            <img width="125px" height="76px" id="logo" src="https://firebasestorage.googleapis.com/v0/b/save-portfolio.appspot.com/o/portfolio%2Flogo_black.png?alt=media&token=4eb40ce4-0e42-416a-9f67-94500cd5ce50" alt="logo" />
            <ul id="list-menu">
                {
                    ls_item_menu && ls_item_menu.length > 0 &&
                    ls_item_menu.map((item, index) => {
                        return (
                            item.type === "drop" ?
                                <li className="item-menu have-drop" key={item.name_en}>{item.name_vi} <BiChevronDown />
                                    <ul id="list-drop-brand">
                                        <li className="item-brand">VinFast</li>
                                        <li className="item-brand">VinFast</li>
                                        <li className="item-brand">VinFast</li>
                                        <li className="item-brand">VinFast</li>
                                        <li className="item-brand">Lamborghini</li>
                                    </ul>
                                </li>
                                :
                                <li className="item-menu" key={item.name_en}>{item.name_vi}</li>
                        )
                    })
                }
            </ul>

            <InputGroup id="search-header" className="mb-5">
                <Form.Control
                    placeholder="Tìm loại xe"
                    aria-label="Car's type"
                    aria-describedby="basic-addon2"
                    className="search-form"
                />
                <InputGroup.Text className="icon-search"><BiSearch /></InputGroup.Text>
            </InputGroup>

            <Auth></Auth>

            <div id="languages">
                <p className="vi"><strong>VI</strong></p>
                <p> / </p>
                <p className="en"><strong>EN</strong></p>
            </div>
        </div>
    )
}

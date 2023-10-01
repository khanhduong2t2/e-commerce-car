import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import { BiSearch } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { MdOutlineFiberNew } from "react-icons/md";
import InputGroup from 'react-bootstrap/InputGroup';

import { searchProduct } from '../../Redux/Actions/SearchActions';

export default function FormSearch() {
    const dispatch = useDispatch();

    let [showResults, setShowResults] = useState(false);

    const language = useSelector(state => state.language);
    let { lang } = language

    const handleChangeInputSearch = (e) => {
        const value = e.target.value;
        if (value) {
            setShowResults(true)
            dispatch(searchProduct(value))
        }
        else {
            setShowResults(false)
        }
    }

    const searchProductReducer = useSelector((state) => state.searchProduct)
    const { list_results } = searchProductReducer;

    return (
        <>
            <InputGroup id="search-header" className="mb-5">
                <Form.Control
                    placeholder={lang === "en" ? "Search cars" : "Tìm kiếm xe"}
                    aria-label="Car's type"
                    aria-describedby="basic-addon2"
                    className="search-form"

                    onChange={(e) => handleChangeInputSearch(e)}
                />
                <InputGroup.Text className="icon-search"><BiSearch /></InputGroup.Text>

                {
                    (showResults && list_results && list_results.length) ?
                        <ul id="list-result-search">
                            {
                                list_results.map((item) => {
                                    return (
                                        <li className="item-search" key={item._id}>
                                            <NavLink className="item-link" to={'/detail-product/' + item.product_id} activeclassname="active">
                                                <img width="97px" src={item.link_image[0]} alt="img_link"></img>
                                                <p>{item.name}</p>
                                                {item.status === "new" && <MdOutlineFiberNew className="icon-new" />}
                                            </NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        : null
                }
            </InputGroup>
        </>
    )
}

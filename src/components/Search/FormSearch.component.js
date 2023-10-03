import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import { BiSearch } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { MdOutlineFiberNew } from "react-icons/md";
import InputGroup from 'react-bootstrap/InputGroup';

import { searchProduct } from '../../Redux/Actions/SearchActions';

export default function FormSearch(props) {
    const dispatch = useDispatch();

    const listResult = useRef();

    let [showResults, setShowResults] = useState(false);

    const language = useSelector(state => state.language);
    let { lang } = language

    const searchProductReducer = useSelector((state) => state.searchProduct)
    const { list_results } = searchProductReducer;

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

    //Xử lý hide/show Form Search
    const [widthSearch, setWidthSearch] = useState(25);
    const [turnSearch, setTurnSearch] = useState(false);
    const [showingSearch, setShowingSearch] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleClickIconSearch = () => {
        if (windowWidth <= 1600) {
            setTurnSearch(!turnSearch);

            let element = listResult.current;
            const computedStyle = window.getComputedStyle(element);
            let displayStyle = computedStyle.getPropertyValue('display');
            element.style.display = displayStyle === "none" ? "block" : "none";

            if (element.style.display === "block") {
                setShowingSearch(true)
                setWidthSearch(60)
                props.getWidthListMenu(15)
            } else {
                setShowingSearch(false)
                setWidthSearch(5)
                props.getWidthListMenu(70)
            }
        }
    }

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
        let element = listResult.current;
        if (windowWidth <= 1600) {
            if (!turnSearch) {
                element.style.display = "none";
                setShowingSearch(false);

                setWidthSearch(5);
                props.getWidthListMenu(70);
            }
        } else {
            setTurnSearch(false);
            setShowingSearch(true);
            element.style.display = "block";

            setWidthSearch(25);
            props.getWidthListMenu(50);
        }
    }, [windowWidth, turnSearch, props])
    //-end
    return (
        <>
            {/* className="mb-5" */}
            <InputGroup id="search-header" style={{ "width": widthSearch + "%" }}>
                <Form.Control
                    placeholder={lang === "en" ? "Search cars" : "Tìm kiếm xe"}
                    aria-label="Car's type"
                    aria-describedby="basic-addon2"
                    className="search-form"
                    onChange={(e) => handleChangeInputSearch(e)}
                    ref={listResult}
                />
                <InputGroup.Text className="icon-search"
                    onClick={() => handleClickIconSearch()}
                >
                    <BiSearch /></InputGroup.Text>

                {
                    (showingSearch && showResults && list_results && list_results.length) ?
                        <ul id="list-result-search" >
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

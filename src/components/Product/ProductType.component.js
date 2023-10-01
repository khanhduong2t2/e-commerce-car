import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { MdOutlineFiberNew } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Pagination, Spinner } from 'react-bootstrap';

import { formattedAmount } from '../../helpers/format_money';
import { listProductType } from '../../Redux/Actions/ProductActions';
export default function ProductType() {
    let { typeCar } = useParams();
    const dispatch = useDispatch();

    const language = useSelector((state) => state.language);
    let { lang } = language;

    const productType = useSelector((state) => state.productType);
    let { loading, error, listProducts, type } = productType;

    const numberShow = 9;
    let [products, setProducts] = useState([]);
    let [amountNode, setAmountNode] = useState(0);
    let [nowNode, setNowNode] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!listProducts || typeCar !== type) {
            dispatch(listProductType(typeCar))
        }

        if (listProducts && listProducts.length > 0) {
            listProducts.sort((itemA, itemB) => {
                if (itemA.status === "new" && itemB.status !== "new") {
                    return -1
                } else if (itemA.status !== "new" && itemB.status === "new") {
                    return 1
                }
                return 0
            })
            setProducts(listProducts);

            let lenProducts = listProducts.length;
            if (lenProducts % numberShow !== 0) {
                setAmountNode(Math.floor(lenProducts / numberShow) + 1)
            } else {
                setAmountNode(Math.floor(lenProducts / numberShow))
            }
        }
    }, [dispatch, typeCar, listProducts, type])

    const handleChangeSelect = (e) => {
        let sortProducts = [...products];
        if (e.target.value === 'new') {
            sortProducts.sort((itemA, itemB) => {
                if (itemA.status === "new" && itemB.status !== "new") {
                    return -1
                } else if (itemA.status !== "new" && itemB.status === "new") {
                    return 1
                }
                return 0
            })
        } else if (e.target.value === 'low-hight') {
            sortProducts.sort((itemA, itemB) => itemA.price - itemB.price)
        } else if (e.target.value === 'hight-low') {
            sortProducts.sort((itemA, itemB) => itemB.price - itemA.price)
        }
        setProducts(sortProducts)
    }

    const handleClickNode = (node) => {
        setNowNode(node);
        scrollToTop();
    }

    const renderParagraphs = (amount) => {
        const paragraphs = [];
        for (let i = 1; i <= amount; i++) {
            paragraphs.push(
                <Pagination.Item key={i} active={i === nowNode} onClick={() => handleClickNode(i)}>
                    {i}
                </Pagination.Item>
            );
        }
        return paragraphs;
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        < div id="list-products">
            {
                loading ? (
                    <Spinner animation="border" variant="primary" />
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        <div className="select-sort">
                            <p>{lang === "en" ? "Show:" : "Hiển thị: "}</p>
                            <Form.Select onChange={(e) => handleChangeSelect(e)}>
                                <option value="new">{lang === "en" ? "Newest" : "Mới nhất"}</option>
                                <option value="low-hight">{lang === "en" ? "Price: low to high" : "Giá: thấp đến cao"}</option>
                                <option value="hight-low">{lang === "en" ? "Price: high to low" : "Giá: cao đến thấp"}</option>
                            </Form.Select>
                        </div>
                        {
                            products && products.length > 0 &&
                            <div className="container-brand">
                                {
                                    products.map((item, index) => {
                                        return (
                                            ((9 * nowNode) - 9 <= index && index <= (9 * nowNode) - 1) &&
                                            <Link to={`/detail-product/${item.product_id}`} className="item-product" key={item.product_id}>
                                                <div>
                                                    <img src={item.link_image[0]} alt="itemImage" />
                                                    {item.status === "new" && <MdOutlineFiberNew className="icon-new" />}
                                                    <p className="name-item">{item.name}</p>
                                                    <p className="price-item">{lang === "en" ? "Price: " : "Giá từ: "} {formattedAmount(item.price)}</p>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        }

                        {amountNode > 1 && <Pagination className="pagination-product-type" size="sm">{renderParagraphs(amountNode)}</Pagination>}
                    </>
                )
            }
        </div >
    )
}

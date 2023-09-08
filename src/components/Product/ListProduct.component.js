// import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { formattedAmount } from '../../helpers/format_money';
import { listProduct } from "../../Redux/Actions/ProductActions"
import Spinner from 'react-bootstrap/Spinner';

export default function ListProduct() {
    // let [listProduct, setListProduct] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const { data } = await axios.get('http://localhost:8000/v1/eco/product/list-products')

    //         if (data.status && data.data.length > 0) {
    //             setListProduct(data.data)
    //         }
    //     }
    //     fetchData()
    // }, [])

    //----------------------------------------------------------------
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList)

    const { loading, error, payload: products } = productList;

    useEffect(() => {
        dispatch(listProduct())
    }, [dispatch])

    return (
        < div id="container-list-products" >
            {
                loading ? (
                    <Spinner animation="border" variant="primary" />
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        {
                            products && products.length > 0 &&
                            products.map((item, index) => {
                                return (
                                    <div key={item._id}>
                                        <h2>{item._id}</h2>
                                        <div className="container-brand">
                                            {
                                                item.list_item.length > 0 &&
                                                item.list_item.map((item, index) => {
                                                    return (
                                                        <Link to={`/detail-product/${item.slug}`} className="item-product" key={item.slug}>
                                                            <div>
                                                                <img src={item.link_image[0]} alt="itemImage" />
                                                                <p className="name-item">{item.name}</p>
                                                                <p className="price-item">Giá từ: {formattedAmount(item.price)}</p>
                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                )
            }

            {/* <div>
                <h2>VinFast</h2>
                <div className="container-brand">
                    <div className="item-product">
                        <img src="https://vietnam-mercedes.com.vn/wp-content/uploads/2021/12/Mercedes-Benz-G-63-g1-1.png" alt="itemImage" />
                        <p className="name-item">Mercedes AMG G63</p>
                        <p className="price-item">Giá từ: 7.000.000.000</p>
                    </div>
                    <div className="item-product">
                        <img src="https://vietnam-mercedes.com.vn/wp-content/uploads/2021/12/Mercedes-Benz-G-63-g1-1.png" alt="itemImage" />
                        <p className="name-item">Mercedes AMG G63</p>
                        <p className="price-item">Giá từ: 7.000.000.000</p>
                    </div>
                    <div className="item-product">
                        <img src="https://vietnam-mercedes.com.vn/wp-content/uploads/2021/12/Mercedes-Benz-G-63-g1-1.png" alt="itemImage" />
                        <p className="name-item">Mercedes AMG G63</p>
                        <p className="price-item">Giá từ: 7.000.000.000</p>
                    </div>
                    <div className="item-product">
                        <img src="https://vietnam-mercedes.com.vn/wp-content/uploads/2021/12/Mercedes-Benz-G-63-g1-1.png" alt="itemImage" />
                        <p className="name-item">Mercedes AMG G63</p>
                        <p className="price-item">Giá từ: 7.000.000.000</p>
                    </div>
                    <div className="item-product">
                        <img src="https://vietnam-mercedes.com.vn/wp-content/uploads/2021/12/Mercedes-Benz-G-63-g1-1.png" alt="itemImage" />
                        <p className="name-item">Mercedes AMG G63</p>
                        <p className="price-item">Giá từ: 7.000.000.000</p>
                    </div>
                </div>
            </div> */}
        </div >
    )
}

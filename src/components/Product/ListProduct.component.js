// import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { MdOutlineFiberNew } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { formattedAmount } from '../../helpers/format_money';
import { listProduct } from "../../Redux/Actions/ProductActions"

export default function ListProduct() {
    // let [listProduct, setListProduct] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const { data } = await axios.get('')

    //         if (data.status && data.data.length > 0) {
    //             setListProduct(data.data)
    //         }
    //     }
    //     fetchData()
    // }, [])

    //----------------------------------------------------------------
    const dispatch = useDispatch();

    const listProducts = useSelector((state) => state.listProducts)
    const { loading, error, list_products } = listProducts;

    const language = useSelector((state) => state.language);
    let { lang } = language;

    useEffect(() => {
        dispatch(listProduct())
    }, [dispatch])

    return (
        < div id="container-list-products">
            {
                loading ? (
                    <Spinner animation="border" variant="primary" />
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        {
                            list_products && list_products.length > 0 &&
                            list_products.map((item, index) => {
                                return (
                                    <div key={item._id}>
                                        <h2>{item._id}</h2>
                                        <div className="container-brand">
                                            {
                                                item.list_item.length > 0 &&
                                                item.list_item.map((item, index) => {
                                                    return (
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
                                    </div>
                                )
                            })
                        }
                    </>
                )
            }
        </div >
    )
}

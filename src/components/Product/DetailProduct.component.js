//import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from "../../Redux/Actions/ProductActions"
import { Spinner } from 'react-bootstrap';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
export default function DetailProduct() {
    let { slug } = useParams();
    // let [detail, setDetail] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         let { data } = await axios.get(`http://localhost:8000/v1/eco/product/detail-product/${slug}`)
    //         if (data.status && data.data) {
    //             setDetail(data.data)
    //         }
    //     }
    //     fetchData()
    // }, [slug])

    //------------------------------------------------------------------------------
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);

    const { loading, error, payload: detail } = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(slug))
    }, [dispatch, slug])

    //----------Add To Cart --------
    const history = useHistory();
    const handleAddToCart = () => {
        console.log('Add to cart')
        history.push(`/cart`)
    }

    return (
        <div id="container-detail-product">
            <div className="detail-product">
                {
                    loading ? (
                        <Spinner animation="border" variant="primary" />
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <>
                            <div className="list-images">
                                {
                                    detail && detail.link_image &&
                                    <img src={detail.link_image[0]} alt="imgCar"></img>
                                }
                                {/* <img src="https://vinfastmientrung.com/wp-content/uploads/2022/08/vinfast-color-xe-o-to-dien_0018_vf-9.png" alt="imgCar"></img> */}
                                {/* <img src={detailProduct.link_image[0]} alt="imgCar"></img> */}
                            </div>
                            <div className="content-detail">
                                {
                                    detail && detail.name &&
                                    <>
                                        <p>{detail.name}</p>
                                        <Button onClick={handleAddToCart}
                                            type="primary" shape="round" icon={<ShoppingCartOutlined />} size="large">
                                            Thêm vào giỏ hàng
                                        </Button>
                                        <Button type="primary" shape="round" icon={<ShoppingCartOutlined />} size="large">
                                            Mua ngay
                                        </Button>
                                    </>

                                }
                            </div>
                        </>
                    )
                }
            </div>
        </div >
    )
}

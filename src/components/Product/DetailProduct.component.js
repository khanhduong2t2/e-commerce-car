import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'antd';
import { Spinner } from 'react-bootstrap';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { addNewCart } from "../../Redux/Actions/CartActions";
import { detailsProduct } from "../../Redux/Actions/ProductActions";
import CarouselImage from './CarouselImage.component';
import { formattedAmount } from '../../helpers/format_money';
import DetailInfo from './DetailInfo.component';
import { SHOW_FORM_LOGIN } from '../../Redux/Constants/AuthConstants';

export default function DetailProduct() {
    const dispatch = useDispatch();
    let { product_id } = useParams();

    const language = useSelector(state => state.language);
    let { lang } = language;

    const userLogin = useSelector(state => state.userLogin);
    const productDetails = useSelector(state => state.productDetails);

    const { infoUser } = userLogin;
    const { loading, error, detail } = productDetails;

    useEffect(() => {
        window.scrollTo(0, 0);

        dispatch(detailsProduct(product_id))
    }, [dispatch, product_id])

    //----------Add To Cart --------
    const handleAddToCart = (product_id) => {
        if (infoUser && infoUser.id && infoUser.username) {
            dispatch(addNewCart(infoUser.id, product_id, 1, lang))
        } else {
            dispatch({ type: SHOW_FORM_LOGIN })
        }
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
                                <CarouselImage></CarouselImage>
                            </div>
                            <div className="content-detail">
                                {
                                    detail && detail.name &&
                                    <>
                                        <h2>{detail.name}</h2>
                                        <p>{formattedAmount(detail.price)}</p>

                                        <div className="box-promotion">
                                            {
                                                lang === "en" ?
                                                    <>
                                                        <p><strong>Promotions & Deals</strong></p>
                                                        <p>-Free MBI material insurance</p>
                                                        <p>-Free genuine accessories Heat insulation film + Nano coating</p>
                                                        <p>-Offering a 3-year unlimited km warranty</p>
                                                        <p>-Car handover ceremony</p>
                                                        <p><em>* Please contact the consulting hotline to receive information about incentives and promotions</em></p>
                                                    </>
                                                    :
                                                    <>
                                                        <p><strong>Khuyến mãi & Ưu đãi</strong></p>
                                                        <p>-Tặng bảo hiểm vật chất MBI</p>
                                                        <p>-Tặng phụ kiện chính hãng Film cách nhiệt + phủ Nano</p>
                                                        <p>-Tặng bảo hành 3 năm không giới hạn km</p>
                                                        <p>-Tặng lễ bàn giao xe</p>
                                                        <p><em>* Quý khách vui lòng liên hệ hotline tư vấn, nhận thông tin ưu đãi và khuyến mãi</em></p>
                                                    </>
                                            }

                                        </div>

                                        <Button onClick={() => handleAddToCart(detail.product_id)}
                                            type="primary" shape="round" icon={<ShoppingCartOutlined />} size="large">
                                            {lang === "en" ? "Add to cart" : "Thêm vào giỏ hàng"}
                                        </Button>
                                    </>
                                }
                            </div>
                        </>
                    )
                }
            </div>
            <DetailInfo />
        </div >
    )
}

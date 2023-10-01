import React, { useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Feedback from '../Feedback/Feedback.component';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoProduct } from '../../Redux/Actions/ProductActions';
export default function DetailInfo() {
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    let { detail } = productDetails;

    const infoProduct = useSelector(state => state.infoProduct);
    let { info } = infoProduct;

    const language = useSelector(state => state.language)
    let { lang } = language;
    useEffect(() => {
        if (detail && detail.product_id) {
            dispatch(getInfoProduct(detail.product_id))
        }
    }, [detail, dispatch])

    return (
        <div className="detail-info">
            <Tabs
                defaultActiveKey="description"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab className="description" eventKey="description" title={lang === "en" ? "Description" : "Mô tả"}>
                    {
                        lang === "vi" && info && info.content &&
                        info.content.map((item, index) => {
                            return (
                                <div className='contain-content' key={index} dangerouslySetInnerHTML={{ __html: item }} />
                            )
                        })
                    }

                    {
                        lang === "en" && info && info.content_en &&
                        info.content_en.map((item, index) => {
                            return (
                                <div className='contain-content' key={index} dangerouslySetInnerHTML={{ __html: item }} />
                            )
                        })
                    }

                    {(!info || info.length === 0) && lang === "vi" && <p>Chúng tôi sẽ cập nhật thông tin sớm nhất !</p>}
                    {(!info || info.length === 0) && lang === "en" && <p>We will update information as soon as possible !</p>}

                </Tab>
                <Tab className="rate" eventKey="rate" title={lang === "en" ? "Rate" : "Đánh giá"}>
                    <Feedback product={detail}></Feedback>
                </Tab>
            </Tabs>
        </div>
    )
}

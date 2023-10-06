import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { SlClose } from "react-icons/sl";
import { Button, Spinner, Table } from 'react-bootstrap';

import FastAns from '../Feedback/FastAns.component';
import FaceFeedback from '../Feedback/FaceFeedback.component';

import { formattedAmount } from '../../helpers/format_money';
import { textLanguage, paymentStatus, paymentType, deliveryStatus } from '../../util/text_language';

import { reOrderAction } from '../../Redux/Actions/OrderActions';
import { RE_ORDER_RESET } from '../../Redux/Constants/OrderConstants';
import { RESET_CANCEL_PURCHASE } from '../../Redux/Constants/PurchaseConstants';
import { ADD_CONTENT_ANS, RESET_TYPE_FEEL } from '../../Redux/Constants/FeedbackConstant';
import { cancelPurchaseAction, feedbackPurchaseAction, getListPurchase } from '../../Redux/Actions/PurchaseActions';

export default function Purchase() {
    const dispatch = useDispatch();
    let history = useHistory();

    const [showPopup, setShowPopup] = useState(false);
    const [orderCancel, setOrderCancel] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [orderFeedback, setOrderFeedback] = useState(null);
    const [viewFeedback, setViewFeedback] = useState({ data: null, disable_feedback: false });

    const language = useSelector((state) => state.language);
    let { lang } = language;
    let content_lang = lang === "en" ? textLanguage.EN : textLanguage.VI;

    const userLogin = useSelector(state => state.userLogin);
    const { infoUser } = userLogin;

    const reOrder = useSelector(state => state.reOrder);
    const { isSuccess, data: dataReOrder } = reOrder;

    const FBPrivate = useSelector(state => state.FBPrivate);
    const { type_feel, list_ans, content } = FBPrivate;

    const listPurchases = useSelector(state => state.listPurchases);
    const { isLoading, errMessage, list_purchases } = listPurchases;

    const cancelPurchase = useSelector(state => state.cancelPurchase);
    const { isLoading: loadingCancel, purchaseCancel, message: messageCancel } = cancelPurchase;

    const feedbackPurchase = useSelector(state => state.feedbackPurchase);
    const { isLoading: loadingFeedback, purchaseFeedback, message: messageFeedback } = feedbackPurchase;

    useEffect(() => {
        if (infoUser && infoUser.id) {
            dispatch(getListPurchase(infoUser.id))
        }
    }, [infoUser, dispatch])

    useEffect(() => {
        if ((purchaseCancel && messageCancel)) {
            setShowPopup(false);
        }
        if ((purchaseFeedback && messageFeedback)) {
            setShowFeedback(false);
        }
    }, [purchaseCancel, messageCancel, purchaseFeedback, messageFeedback])

    const handleCancelClick = (data) => {
        dispatch({
            type: RESET_CANCEL_PURCHASE
        });
        setOrderCancel(data);
        setShowPopup(true);
    };

    const handleConfirmCancel = (purchase_id) => {
        if (infoUser && purchase_id) {
            dispatch(cancelPurchaseAction(infoUser.id, purchase_id, lang, orderCancel.index))
        } else {
            toast.error(content_lang.error_message, {
                autoClose: 3000
            })
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setShowFeedback(false);
        dispatch({
            type: RESET_TYPE_FEEL
        })
    };

    const handleClickFeedback = (data) => {
        setViewFeedback({
            data: null,
            disable_feedback: false
        })
        setOrderFeedback(data);
        setShowFeedback(true);
        dispatch({
            type: RESET_TYPE_FEEL
        })
    }

    const handleClickViewFeedback = (data) => {
        setViewFeedback({
            data: data,
            disable_feedback: true
        })
        setShowFeedback(true);
        dispatch({
            type: RESET_TYPE_FEEL
        });
    }

    const handleChangeContent = (e) => {
        dispatch({
            type: ADD_CONTENT_ANS,
            payload: {
                content: e.target.value
            }
        })
    }

    const clickSendFeedback = (purchase_id) => {
        if (infoUser && purchase_id) {
            if (!type_feel && (!list_ans || list_ans.length === 0) && !content) {
                toast.error(content_lang.require_feedback)
            } else {
                let feedback = {
                    type_feel, list_ans, content
                }
                dispatch(feedbackPurchaseAction(infoUser.id, purchase_id, feedback, lang, orderFeedback.index));
            }
        } else {
            toast.error(content_lang.error_message, {
                autoClose: 3000
            })
        }
    }

    const handleClickReOrder = (id_order) => {
        if (infoUser && id_order) {
            dispatch(reOrderAction(infoUser.id, id_order))

        } else {
            toast.error(content_lang.error_message, {
                autoClose: 3000
            })
        }
    }

    useEffect(() => {
        if (isSuccess && dataReOrder) {
            dispatch({
                type: RE_ORDER_RESET
            })
            history.push("/cart")
        }
    }, [isSuccess, dataReOrder, history, dispatch])

    //Mobile
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div id="container-purchase">
            {
                windowWidth >= 600 ?
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="col-stt">{content_lang.stt_items}</th>
                                <th className="col-name">{content_lang.name_items}</th>
                                <th className="col-price">{content_lang.price_items}</th>
                                <th className="col-sum-price">{content_lang.total_price}</th>
                                <th className="col-payment">{content_lang.payment_status}</th>
                                <th className="col-status">{content_lang.order_status}</th>
                                <th className="col-action">{content_lang.actions}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading ?
                                    <tr>
                                        <td colSpan="7" style={{ "textAlign": "center", "padding": "20px 0px" }}>
                                            <Spinner animation="border" variant="primary" />
                                        </td>
                                    </tr>
                                    : (
                                        errMessage ?
                                            <tr>
                                                <td colSpan="7" style={{ "textAlign": "center", "padding": "20px 0px" }}>
                                                    <p>{content_lang.error_message}</p>
                                                </td>
                                            </tr>
                                            : (
                                                list_purchases && list_purchases.length > 0
                                                    ? list_purchases.map((item, index) => {
                                                        return (
                                                            <tr key={index} >
                                                                <td className="col-stt">#{index + 1}</td>
                                                                <td className="col-name">
                                                                    {
                                                                        item.list_carts.map((item, index) => {
                                                                            return (
                                                                                <div className="contain-item" key={index}>
                                                                                    <img width="100px" height="50px" src={item.link_image[0]} alt="img" />
                                                                                    <p>{item.name}&nbsp; <i>x{item.quantity}</i></p>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </td>
                                                                <td className="col-price">
                                                                    {
                                                                        item.list_carts.map((item, index) => {
                                                                            return (
                                                                                <p key={index}>{item.price}&nbsp; <i>x{item.quantity}</i></p>
                                                                            )
                                                                        })
                                                                    }
                                                                </td>
                                                                <td className="col-sum-price">
                                                                    <p style={{ "textDecoration": "line-through" }}>{formattedAmount(item.cost)}</p>
                                                                    <p>{content_lang.discount_code}: {item.code_promotion}</p>
                                                                    <p>{content_lang.total}: {formattedAmount(item.total_price)}</p>
                                                                </td>
                                                                <td className="col-payment">
                                                                    {
                                                                        lang === "en" ?
                                                                            <p>{paymentType[item.payment_type].mess_en} - {paymentStatus[item.payment_status].mess_en}</p>
                                                                            :
                                                                            <p>{paymentType[item.payment_type].mess_vi} - {paymentStatus[item.payment_status].mess_vi}</p>
                                                                    }
                                                                </td>
                                                                <td className="col-status">
                                                                    {
                                                                        lang === "en" ?
                                                                            <p>{item.order_status === "CANCELED" ? content_lang.canceled : deliveryStatus[item.delivery_status].mess_en}</p>
                                                                            :
                                                                            <p>{item.order_status === "CANCELED" ? content_lang.canceled : deliveryStatus[item.delivery_status].mess_vi}</p>
                                                                    }
                                                                </td>
                                                                <td className="col-action">
                                                                    {
                                                                        item.delivery_status !== "DELIVERED" && !["SUCCEED", "CANCELED", "ERROR"].includes(item.order_status) ?
                                                                            <p className="cancel-order"
                                                                                onClick={() => handleCancelClick({ id: item._id, index: index })}
                                                                            >{content_lang.cancel_item}</p>
                                                                            :
                                                                            <>
                                                                                {
                                                                                    item.feedback && item.feedback.type_feel ?
                                                                                        <Button className="btn-feedback" variant="primary"
                                                                                            onClick={() => handleClickViewFeedback(item.feedback)}
                                                                                        >{content_lang.see_review}</Button>
                                                                                        :
                                                                                        <Button className="btn-feedback" variant="primary"
                                                                                            onClick={() => handleClickFeedback({ id: item._id, index: index })}
                                                                                        >{content_lang.review}</Button>
                                                                                }

                                                                                <Button className="btn-reorder" variant="primary"
                                                                                    onClick={() => handleClickReOrder(item._id)}
                                                                                >{content_lang.reorder}</Button>
                                                                            </>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    < tr >
                                                        <td colSpan="7" style={{ "textAlign": "center", "padding": "20px 0px" }}>
                                                            <p>{content_lang.dont_have_items}</p>
                                                        </td>
                                                    </tr>
                                            )
                                    )
                            }
                        </tbody>
                    </Table>
                    :
                    <div id="purchase-mobile">
                        {
                            isLoading ?
                                <Spinner animation="border" variant="primary" />
                                :
                                <>
                                    {
                                        list_purchases && list_purchases.length > 0
                                            ? list_purchases.map((item, index) => {
                                                return (
                                                    <div className="item-purchase" key={index}>
                                                        <strong>{content_lang.stt_items}: #{index + 1}</strong>
                                                        {
                                                            item.list_carts.map((item, index) => {
                                                                return (
                                                                    <div className="name-product" key={index}>
                                                                        <img width="100px" height="50px" src={item.link_image[0]} alt="img" />
                                                                        <p className="name-price">
                                                                            <span>{item.name}&nbsp; <i>x{item.quantity}</i></span>
                                                                            <span key={index}>{formattedAmount(item.price)}&nbsp; <i>x{item.quantity}</i></span>
                                                                        </p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        <div className="contain-status">
                                                            <div>
                                                                <p style={{ "textDecoration": "line-through" }}>{content_lang.price_items}: {formattedAmount(item.cost)}</p>
                                                                <p>{content_lang.discount_code}: <strong>{item.code_promotion}</strong></p>
                                                                <p>{content_lang.total}: <strong>{formattedAmount(item.total_price)}</strong></p>
                                                            </div>
                                                            <div>
                                                                {
                                                                    lang === "en" ?
                                                                        <>
                                                                            <p>{paymentType[item.payment_type].mess_en} - {paymentStatus[item.payment_status].mess_en}</p>
                                                                            <p>{content_lang.order_status}: {item.order_status === "CANCELED" ? content_lang.canceled : deliveryStatus[item.delivery_status].mess_en}</p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <p>{paymentType[item.payment_type].mess_vi} - {paymentStatus[item.payment_status].mess_vi}</p>
                                                                            <p>{content_lang.order_status}: {item.order_status === "CANCELED" ? content_lang.canceled : deliveryStatus[item.delivery_status].mess_vi}</p>
                                                                        </>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="action">
                                                            {
                                                                item.delivery_status !== "DELIVERED" && !["SUCCEED", "CANCELED", "ERROR"].includes(item.order_status) ?
                                                                    <Button className="cancel-order" variant="primary"
                                                                        onClick={() => handleCancelClick({ id: item._id, index: index })}
                                                                    >{content_lang.cancel_item}</Button>
                                                                    :
                                                                    <>
                                                                        {
                                                                            item.feedback && item.feedback.type_feel ?
                                                                                <Button className="btn-feedback" variant="primary"
                                                                                    onClick={() => handleClickViewFeedback(item.feedback)}
                                                                                >{content_lang.see_review}</Button>
                                                                                :
                                                                                <Button className="btn-feedback" variant="primary"
                                                                                    onClick={() => handleClickFeedback({ id: item._id, index: index })}
                                                                                >{content_lang.review}</Button>
                                                                        }

                                                                        <Button className="btn-reorder" variant="primary"
                                                                            onClick={() => handleClickReOrder(item._id)}
                                                                        >{content_lang.reorder}</Button>
                                                                    </>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )
                                            :
                                            <p></p>
                                    }
                                </>
                        }
                    </div>
            }
            {showPopup &&
                <div className="popup">
                    <div className="popup-content">
                        <p>Bạn có chắc chắn muốn hủy không?</p>
                        <p>Đơn hàng #{orderCancel.index + 1}</p>
                        {
                            loadingCancel ?
                                <Spinner animation="border" variant="primary" />
                                :
                                <>
                                    <button className="btn-cancel" onClick={() => handleConfirmCancel(orderCancel.id)}>Hủy</button>
                                    <button onClick={() => handleClosePopup()}>Không</button>
                                </>
                        }
                    </div>
                </div>
            }

            {showFeedback &&
                <div className="popup">
                    <div className="popup-content form-rate">
                        <SlClose className="icon-close"
                            onClick={() => handleClosePopup()}
                        ></SlClose>
                        <h4>Đánh giá đơn hàng</h4>
                        <FaceFeedback
                            typeFeel={(viewFeedback.data && viewFeedback.data.type_feel) ? viewFeedback.data.type_feel : null}
                            disable_feedback={viewFeedback.disable_feedback}>
                        </FaceFeedback>
                        <FastAns
                            listAns={(viewFeedback.data && viewFeedback.data.list_ans && viewFeedback.data.list_ans.length > 0)
                                ? viewFeedback.data.list_ans : null}>
                        </FastAns>
                        {
                            viewFeedback.data && viewFeedback.data.content ?
                                <textarea defaultValue={viewFeedback.data.content} label="Đánh giá"
                                ></textarea>
                                :
                                <>
                                    <textarea value={content ? content : ''} label="Đánh giá"
                                        onChange={(e) => handleChangeContent(e)}
                                    ></textarea>
                                    {
                                        loadingFeedback ?
                                            <Spinner animation="border" variant="primary" />
                                            :
                                            <Button
                                                type="primary" shape="round" size="large"
                                                className="btn-send"
                                                onClick={() => clickSendFeedback(orderFeedback.id)}
                                            >
                                                Gửi đánh giá
                                            </Button>
                                    }
                                </>
                        }

                    </div>
                </div>
            }
        </div>
    )
}

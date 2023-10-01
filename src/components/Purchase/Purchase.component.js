import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { Button, Spinner, Table } from 'react-bootstrap';
import { SlClose } from "react-icons/sl";

import { formattedAmount } from '../../helpers/format_money';
import { RESET_CANCEL_PURCHASE } from '../../Redux/Constants/PurchaseConstants';
import { cancelPurchaseAction, feedbackPurchaseAction, getListPurchase } from '../../Redux/Actions/PurchaseActions';

import FaceFeedback from '../Feedback/FaceFeedback.component';
import FastAns from '../Feedback/FastAns.component';
import { ADD_CONTENT_ANS, RESET_TYPE_FEEL } from '../../Redux/Constants/FeedbackConstant';
import { useHistory } from 'react-router-dom';
import { reOrderAction } from '../../Redux/Actions/OrderActions';
import { RE_ORDER_RESET } from '../../Redux/Constants/OrderConstants';

export default function Purchase() {
    const dispatch = useDispatch();
    let history = useHistory();

    let paymentStatus = {
        PAID: {
            mess_vi: "Đã thanh toán",
            mess_en: "Paid",
        },
        UNPAID: {
            mess_vi: "Chưa thanh toán",
            mess_en: "Unpaid",
        }
    }

    let paymentType = {
        CASH: {
            mess_vi: "Tiền mặt",
            mess_en: "Cash",
        },
        TRANSFER: {
            mess_vi: "Chuyển khoản",
            mess_en: "Transfer",
        }
    }

    let deliveryStatus = {
        UNDELIVERY: {
            mess_vi: "Đang xử lý",
            mess_en: "Application received",
        },
        PREPARING: {
            mess_vi: "Đang chuẩn bị đơn hàng",
            mess_en: "Preparing orders",
        },
        DELIVERING: {
            mess_vi: "Đang vận chuyển",
            mess_en: "Being transported",
        },
        DELIVERED: {
            mess_vi: "Đã nhận hàng",
            mess_en: "Goods received",
        }
    }

    const [showPopup, setShowPopup] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [orderCancel, setOrderCancel] = useState(null);
    const [orderFeedback, setOrderFeedback] = useState(null);
    const [viewFeedback, setViewFeedback] = useState({ data: null, disable_feedback: false });


    const userLogin = useSelector(state => state.userLogin);
    const { infoUser } = userLogin;

    const listPurchases = useSelector(state => state.listPurchases);
    const { isLoading, errMessage, list_purchases } = listPurchases;

    const cancelPurchase = useSelector(state => state.cancelPurchase);
    const { isLoading: loadingCancel, purchaseCancel, message: messageCancel } = cancelPurchase;

    const feedbackPurchase = useSelector(state => state.feedbackPurchase);
    const { isLoading: loadingFeedback, purchaseFeedback, message: messageFeedback } = feedbackPurchase;

    const FBPrivate = useSelector(state => state.FBPrivate);
    const { type_feel, list_ans, content } = FBPrivate;

    const reOrder = useSelector(state => state.reOrder);
    const { isSuccess, data: dataReOrder } = reOrder;

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
            let lang = "vi";
            dispatch(cancelPurchaseAction(infoUser.id, purchase_id, lang, orderCancel.index))
        } else {
            toast.error("Có lỗi xảy ra! Bạn vui lòng thử lại sau", {
                autoClose: 3000
            })
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setShowFeedback(false);
    };

    const handleClickFeedback = (data) => {
        dispatch({
            type: RESET_TYPE_FEEL
        })
        setOrderFeedback(data);
        setShowFeedback(true);
    }

    const handleClickViewFeedback = (data) => {
        dispatch({
            type: RESET_TYPE_FEEL
        });
        setViewFeedback({
            data: data,
            disable_feedback: true
        })
        setShowFeedback(true);
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
                toast.error("Vui lòng cho đánh giá !")
            } else {
                let lang = "vi";
                let feedback = {
                    type_feel, list_ans, content
                }
                dispatch(feedbackPurchaseAction(infoUser.id, purchase_id, feedback, lang, orderFeedback.index));
            }
        } else {
            toast.error("Có lỗi xảy ra! Bạn vui lòng thử lại sau", {
                autoClose: 3000
            })
        }
    }

    const handleClickReOrder = (id_order) => {
        if (infoUser && id_order) {
            dispatch(reOrderAction(infoUser.id, id_order))

        } else {
            toast.error("Có lỗi xảy ra! Bạn vui lòng thử lại sau", {
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

    return (
        <div id="container-purchase">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="col-stt">Đơn Hàng</th>
                        <th className="col-name">Sản phẩm</th>
                        <th className="col-price">Giá</th>
                        <th className="col-sum-price">Tổng giá trị đơn hàng</th>
                        <th className="col-payment">Thanh toán</th>
                        <th className="col-status">Trạng thái</th>
                        <th className="col-action">Hành động</th>
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
                                            <p>Có lỗi xảy ra !</p>
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
                                                            <p>Mã giảm: {item.code_promotion}</p>
                                                            <p>Tổng: {formattedAmount(item.total_price)}</p>
                                                        </td>
                                                        <td className="col-payment">
                                                            <p>{paymentType[item.payment_type].mess_vi} - {paymentStatus[item.payment_status].mess_vi}</p>
                                                        </td>
                                                        <td className="col-status">
                                                            <p>{item.order_status === "CANCELED" ? "Đã được hủy" : deliveryStatus[item.delivery_status].mess_vi}</p>
                                                        </td>
                                                        <td className="col-action">
                                                            {
                                                                item.delivery_status !== "DELIVERED" && !["SUCCEED", "CANCELED", "ERROR"].includes(item.order_status) ?
                                                                    <p className="cancel-order"
                                                                        onClick={() => handleCancelClick({ id: item._id, index: index })}
                                                                    >Hủy đơn hàng</p>
                                                                    :
                                                                    <>
                                                                        {
                                                                            item.feedback && item.feedback.type_feel ?
                                                                                <Button className="btn-feedback" variant="primary"
                                                                                    onClick={() => handleClickViewFeedback(item.feedback)}
                                                                                >Xem đánh giá</Button>
                                                                                :
                                                                                <Button className="btn-feedback" variant="primary"
                                                                                    onClick={() => handleClickFeedback({ id: item._id, index: index })}
                                                                                >Đánh giá</Button>
                                                                        }

                                                                        <Button className="btn-reorder" variant="primary"
                                                                            onClick={() => handleClickReOrder(item._id)}
                                                                        >Đặt lại</Button>
                                                                    </>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            < tr >
                                                <td colSpan="7" style={{ "textAlign": "center", "padding": "20px 0px" }}>
                                                    <p>Bạn chưa có đơn hàng nào !</p>
                                                </td>
                                            </tr>
                                    )
                            )
                    }
                </tbody>
            </Table>
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

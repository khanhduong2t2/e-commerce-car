import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { formattedAmount } from '../../helpers/format_money';
import { getOrderWaiting, payOrder } from '../../Redux/Actions/OrderActions';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../../Redux/Constants/OrderConstants';
import { PayPalButton } from "react-paypal-button-v2";
import { Button, Form, Spinner } from 'react-bootstrap';

export default function OrderPage() {
    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false);
    const [isPayInCash, setIsPayInCash] = useState(false);

    const orderCreate = useSelector(state => state.orderCreate);
    let { order, loading, error } = orderCreate;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const userLogin = useSelector(state => state.userLogin);
    const { infoUser } = userLogin;

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get("http://localhost:8000/v1/eco/config/paypal")
            let clientId = data.data;
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order && !loading && !error) {
            dispatch(getOrderWaiting(infoUser.id))
        }

        if (order && order.payment_status === "UNPAID") {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true)
            }
        } else {
            dispatch({ type: ORDER_PAY_RESET })
        }
    }, [dispatch, successPay, order, infoUser, loading, error]);

    const successPaymentHandler = (is_paid) => {
        dispatch(payOrder(order._id, infoUser.id, is_paid, "TRANSFER"))
    }

    const orderWithCash = () => {
        dispatch(payOrder(order._id, infoUser.id, false, "CASH"))
    }

    const handleClickCash = (e) => {
        if (e.target.checked) {
            setIsPayInCash(true)
        } else {
            setIsPayInCash(false)
        }
    }

    return (
        <div id="container-order">
            {
                loading ? <Spinner animation="border" variant="primary" />
                    : (error ? <p>Có lỗi xảy ra</p>
                        :
                        (
                            order && order.list_carts && order.list_carts.length > 0 &&
                            <>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th className="col-quantity">Số lượng</th>
                                            <th className="col-price">Đơn giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.list_carts.map(item => {
                                                return (
                                                    < tr key={item.id} >
                                                        <td className="col_name_cart">
                                                            <img className="img_cart" src={item.link_image[0]} alt="img_item" />
                                                            <p className="name_item">{item.name}</p>
                                                        </td>
                                                        <td className="col-quantity">{item.quantity}</td>
                                                        <td className="col-price">{formattedAmount(+item.price * item.quantity)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                {
                                    order && order.total_price &&
                                    <div className="summary-cart" style={{ "justifyContent": "space-between" }}>
                                        <div style={{ "display": "flex" }}>
                                            <p>Tổng thanh toán:</p>
                                            <p style={{ 'fontWeight': '500', "textDecoration": "line-through" }}>{formattedAmount(+order.cost)}</p>
                                            <p style={{ 'fontWeight': '500' }}>{formattedAmount(+order.total_price)}</p>
                                            <p>Mã giảm:</p>
                                            <p style={{ 'fontWeight': '500' }}> {order.code_promotion}</p>
                                        </div>

                                        <Form.Check
                                            type="checkbox"
                                            id='abc'
                                            label="Thanh toán bằng tiền mặt"
                                            onChange={(e) => handleClickCash(e)}
                                        />
                                    </div>
                                }

                                {
                                    isPayInCash ?
                                        <div className="btn-order">
                                            <Button className="button-yes" variant="primary"
                                                onClick={() => orderWithCash()}
                                            >Đặt hàng</Button>
                                        </div>
                                        :
                                        (
                                            order.payment_status === "UNPAID" &&
                                            <>
                                                {loadingPay && <p>Loading...</p>}
                                                {!sdkReady ? <p>Loading</p> :
                                                    <PayPalButton
                                                        amount={order.total_price}
                                                        onSuccess={successPaymentHandler}
                                                        className="btn-transfer"
                                                    >
                                                    </PayPalButton>
                                                }
                                            </>
                                        )
                                }

                            </>
                        )
                    )
            }
        </div>
    )
}

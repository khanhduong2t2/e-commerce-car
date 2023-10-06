import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { CiTrash } from "react-icons/ci";
import Table from 'react-bootstrap/Table';
import { useHistory } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';

import { textLanguage } from '../../util/text_language';
import { formattedAmount } from '../../helpers/format_money';

import Popup from './Popup.component';
import QuantityControl from './QuantityControl.component';

import { createOrder } from '../../Redux/Actions/OrderActions';
import { getSuggestAddress } from '../../Redux/Actions/InfoUserActions';
import { getListPromotions } from '../../Redux/Actions/PromotionActions';
import { getListCart, removeItemCart, updateSelected } from "../../Redux/Actions/CartActions";


export default function ListCart() {
    let dispatch = useDispatch();
    let history = useHistory();

    let [listItem, setListItem] = useState();

    const language = useSelector(state => state.language);
    const { lang } = language;
    let content = lang === "en" ? textLanguage.EN : textLanguage.VI;

    const userLogin = useSelector(state => state.userLogin);
    const { infoUser } = userLogin;

    const listCarts = useSelector(state => state.listCarts);
    let { loading, list_carts } = listCarts;

    const promotion = useSelector(state => state.promotion);
    const { list_promotions } = promotion;

    const suggestAddress = useSelector(state => state.suggestAddress);
    const { dataSuggest } = suggestAddress;

    let [selectAll, setSelectAll] = useState(false);
    let [amountSelected, setAmountSelected] = useState(0);
    let [priceSelected, setPriceSelected] = useState(0);
    let [codePromotion, setCodePromotion] = useState(null);
    let [priceWithPromotion, setPriceWithPromotion] = useState(null);
    let [address, setAddress] = useState('');
    let [phone, setPhone] = useState('');

    useEffect(() => {
        if (infoUser && infoUser.id) {
            dispatch(getListCart(infoUser.id))
            dispatch(getListPromotions(infoUser.id))
            dispatch(getSuggestAddress(infoUser.id))
        }
    }, [dispatch, infoUser])

    useEffect(() => {
        if (dataSuggest) {
            setAddress(dataSuggest.address)
            setPhone(dataSuggest.phone)
        }
    }, [dataSuggest])

    useEffect(() => {
        if (!loading && list_carts && list_carts.length > 0) {

            const hasFalseSelect = list_carts.some(item => item.selected === false);
            if (!hasFalseSelect) {
                setSelectAll(true)
            }

            let countSelected = 0;
            let countPriceSelected = 0;
            list_carts.forEach(item => {
                if (item.selected) {
                    countSelected += 1;
                    countPriceSelected += item.quantity * item.productInfo.price;
                }
            })

            setListItem(list_carts)

            setAmountSelected(countSelected)
            setPriceSelected(countPriceSelected)
        }
    }, [loading, list_carts])

    const handleCheckBoxChange = (product_id) => {
        const newData = listItem.map((item) =>
            item.product_id === product_id ? { ...item, selected: !item.selected } : item
        );
        setSelectAll(newData.every((item) => item.selected));

        dispatch(updateSelected(infoUser.id, newData))
    }

    const handleSelectAllChange = () => {
        const selectAllValue = !selectAll;
        const newData = listItem.map((item) => ({ ...item, selected: selectAllValue }));
        setSelectAll(selectAllValue);

        dispatch(updateSelected(infoUser.id, newData))
    }

    const handleDeleteCart = (product_id) => {
        dispatch(removeItemCart(infoUser.id, [product_id]))
    }

    const handleClickButtonBuy = () => {
        let list_carts = [];
        let total_price = priceWithPromotion !== null ? priceWithPromotion : (priceSelected ? priceSelected : null);
        listItem.forEach((item) => {
            if (item.selected) {
                list_carts.push({
                    id: item._id,
                    quantity: item.quantity
                })
            }
        })
        if (list_carts.length > 0 && total_price !== null) {
            if (address && phone) {
                dispatch(createOrder(infoUser.id, list_carts, priceSelected, total_price, codePromotion, address, phone))
                history.push("/order")
            } else {
                toast.warning(content.require_address,
                    {
                        autoClose: 3000,
                    }
                )
            }
        } else {
            alert(lang === 'en' ? 'You have not selected a product yet!' : 'Bạn chưa chọn sản phẩm!')
        }
    }

    const handleChangeSelectPromotion = (e) => {
        let promotion = e.target.value ? JSON.parse(e.target.value) : null;
        if (promotion && promotion.code && promotion.value && promotion.type_value) {
            if (promotion.type_value === "percent") {
                let price_with_promotion = Math.floor(priceSelected - (priceSelected * promotion.value / 100)) + 1000;
                setPriceWithPromotion(price_with_promotion)
                setCodePromotion(promotion.code)
            } else if (promotion.type_value === "price") {
                let price_with_promotion = Math.floor(priceSelected - promotion.value);
                setPriceWithPromotion(price_with_promotion)
                setCodePromotion(promotion.code)
            }
        } else {
            setPriceWithPromotion(null)
            setCodePromotion(null)
        }
    }

    const handleChangeFormAddress = (e, type) => {
        switch (type) {
            case "address":
                setAddress(e.target.value)
                return
            case "phone":
                setPhone(e.target.value)
                return
            default:
                break;
        }
    }

    return (
        <div id="container-list-cart">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="col-select">
                            {
                                listItem && listItem.length > 0 ?
                                    <Checkbox checked={selectAll} onChange={handleSelectAllChange}></Checkbox>
                                    :
                                    <FaRegWindowClose></FaRegWindowClose>
                            }
                        </th>
                        <th>{lang === "en" ? "Product" : "Sản phẩm"}</th>
                        <th className="col-quantity">{lang === "en" ? "Quantity" : "Số lượng"}</th>
                        <th className="col-price">{lang === "en" ? "Price" : "Đơn giá"}</th>
                        <th className="col-action">{lang === "en" ? "Cancel" : "Hủy bỏ"}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ?
                            <tr>
                                <td colSpan="5" style={{ "textAlign": "center", "padding": "20px 0px" }}>
                                    <Spinner animation="border" variant="primary" />
                                </td>
                            </tr>
                            :
                            (
                                listItem ?
                                    (listItem.length > 0 ?
                                        listItem.map(item => {
                                            return (
                                                <tr key={item._id}>
                                                    <td className="col-select">
                                                        <Checkbox
                                                            checked={item.selected}
                                                            onChange={() => handleCheckBoxChange(item.product_id)}
                                                        ></Checkbox>
                                                    </td>
                                                    <td className="col_name_cart">
                                                        <img className="img_cart" src={item.productInfo.link_image[0]} alt="img_item" />
                                                        <p className="name_item">{item.productInfo.name}</p>
                                                    </td>
                                                    <td className="col-quantity"><QuantityControl initQuantity={item.quantity} name_item={item.productInfo.name} id_item={item._id} customer_id={infoUser.id} /></td>
                                                    <td className="col-price">{formattedAmount(+item.productInfo.price * item.quantity)}</td>
                                                    <td className="col-action"><CiTrash className="icon-trash" onClick={() => handleDeleteCart(item._id)} /></td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan="5" style={{ "textAlign": "center", "padding": "20px 0px" }}>
                                                <p>{lang === "en" ? "You have not selected any products yet!" : "Bạn chưa chọn sản phẩm nào !"}</p>
                                            </td>
                                        </tr>
                                    )
                                    : null
                            )
                    }
                </tbody>
            </Table>
            {
                listItem && listItem.length > 0 &&
                <div id="cart-below">
                    <div className="form-address">
                        <input defaultValue={address} onChange={(e) => handleChangeFormAddress(e, 'address')} />
                        <input defaultValue={phone} onChange={(e) => handleChangeFormAddress(e, 'phone')} />
                    </div>
                    <div className="summary-cart" >
                        <p>{lang === "en" ? `Total payment (${amountSelected} products)` : `Tổng thanh toán (${amountSelected} sản phẩm)`} :</p>
                        {
                            (priceWithPromotion !== null) ?
                                <>
                                    <p style={{ 'fontWeight': '500', "textDecoration": "line-through" }}>{formattedAmount(+priceSelected)}</p>
                                    <p style={{ 'fontWeight': '500', "marginRight": "20px" }}>{formattedAmount(+priceWithPromotion)} Fee Ship</p>
                                </>
                                : <p style={{ 'fontWeight': '500' }}>{formattedAmount(+priceSelected)}</p>
                        }
                        {
                            priceSelected && priceSelected > 0 ?
                                <div className="select-promotion">
                                    <Form.Select aria-label="Choose promotion" onChange={(e) => handleChangeSelectPromotion(e)}>
                                        <option value="0">{lang === "en" ? "Select offer" : "Chọn ưu đãi"}</option>
                                        {
                                            list_promotions && list_promotions.length > 0 ?
                                                list_promotions.map((item, index) => {
                                                    return (
                                                        <option key={item._id}
                                                            value={
                                                                JSON.stringify(
                                                                    {
                                                                        code: item.code,
                                                                        value: item.value,
                                                                        type_value: item.type_value
                                                                    }
                                                                )
                                                            }>{item.name}</option>
                                                    )
                                                })
                                                :
                                                <option disabled value="None">{lang === "en" ? "No offer" : "Không có mã"}</option>
                                        }
                                    </Form.Select>
                                </div>
                                :
                                null
                        }
                        <Button className="button-yes" variant="primary"
                            onClick={() => handleClickButtonBuy()}
                        >{lang === "en" ? "Buy" : "Mua Hàng"}</Button>
                    </div>
                </div>
            }
            <Popup></Popup>
        </div>
    )
}
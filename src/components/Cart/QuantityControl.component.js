import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantityItem } from '../../Redux/Actions/CartActions';
import { showPopup } from '../../Redux/Actions/PopupActions';
import { FaPlus } from "react-icons/fa";
import { GrSubtract } from "react-icons/gr";
function QuantityControl(props) {
    let dispatch = useDispatch();
    let id_item = props.id_item;
    let name_item = props.name_item;
    let customer_id = props.customer_id;
    const [quantity, setQuantity] = useState(props.initQuantity);

    useEffect(() => {
        setQuantity(props.initQuantity)
    }, [props])

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
        dispatch(updateQuantityItem(customer_id, id_item, quantity + 1))
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            dispatch(updateQuantityItem(customer_id, id_item, quantity - 1))
        } else {
            let type_popup = 'POPUP_DELETE_ITEM'
            let data = {
                id_item,
                name_item
            }
            dispatch(showPopup(type_popup, data))
        }
    };
    return (
        <div className="quantity-control">
            <GrSubtract className="icon-subtract" onClick={decreaseQuantity}></GrSubtract>
            <p>{quantity}</p>
            <FaPlus className="icon-plus" onClick={increaseQuantity}></FaPlus>

        </div >
    );
}

export default QuantityControl;







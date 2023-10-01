import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../Redux/Actions/PopupActions';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { removeItemCart } from '../../Redux/Actions/CartActions';

export default function Popup() {
    const dispatch = useDispatch();
    const showPopup = useSelector(state => state.showPopup);
    const { type_popup, data } = showPopup;

    const userLogin = useSelector(state => state.userLogin);
    const { infoUser } = userLogin;

    const handleClosePopup = (e) => {
        if (e.target.className.includes("popup-question")) {
            dispatch(closePopup())
        }

        if (e.target.className.includes("button-no")) {
            dispatch(closePopup())
        }
    }

    const handleDeleteCart = (product_id) => {
        dispatch(removeItemCart(infoUser.id, [product_id]))
        dispatch(closePopup())
    }
    return (
        <>
            {
                type_popup === "POPUP_DELETE_ITEM" &&
                <div className="popup-question" onClick={(e) => handleClosePopup(e)} >
                    <Card className="contain-card">
                        <Card.Body>
                            <Card.Title>Bạn chắc chắn muốn hủy bỏ sản phẩm này?</Card.Title>
                            <Card.Text>
                                {data.name_item}
                            </Card.Text>
                            <div className="group-button">
                                <Button className="button-yes" variant="primary"
                                    onClick={() => handleDeleteCart(data.id_item)}
                                >Có</Button>
                                <Button className="button-no" variant="light"
                                    onClick={(e) => handleClosePopup(e)}
                                >Không</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            }
        </>
    )
}

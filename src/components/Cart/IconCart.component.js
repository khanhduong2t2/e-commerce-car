import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { getListCart } from '../../Redux/Actions/CartActions';

export default function IconCart(props) {
    let dispatch = useDispatch();

    let id_user = props.id_user;
    useEffect(() => {
        dispatch(getListCart(id_user))
    }, [dispatch, id_user])

    const listCarts = useSelector(state => state.listCarts);
    const { list_carts } = listCarts;

    return (
        <>
            <NavLink to="/cart" activeclassname="active">
                <ShoppingCartOutlined className="icon-cart" />
                <span style={{ "color": 'white', "textDecoration": "none" }}>{(list_carts && list_carts.length) ? list_carts.length : 0}</span>
            </NavLink>
        </>
    )
}

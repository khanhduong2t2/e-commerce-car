import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiFillHeart } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import StarFeedback from './StarFeedback.component';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_FORM_LOGIN } from '../../Redux/Constants/AuthConstants';
import { UPDATE_CONTENT } from '../../Redux/Constants/FeedbackConstant';
import { createFeedbackPublic, getListFBPublic } from '../../Redux/Actions/FeedbackActions';

export default function Feedback(props) {
    const dispatch = useDispatch();

    let product = props.product;

    const language = useSelector(state => state.language);
    let { lang } = language;

    const userLogin = useSelector(state => state.userLogin);
    let { infoUser } = userLogin;

    const createFBPublic = useSelector(state => state.createFBPublic);
    let { numberStar, content } = createFBPublic;

    const listFBPublic = useSelector(state => state.listFBPublic);
    let { listFeedBack } = listFBPublic;

    let [invalidStar, setInvalidStar] = useState(false);

    const onClickSend = () => {
        if (infoUser && infoUser.id) {
            if (numberStar > 0) {
                dispatch(createFeedbackPublic(infoUser.id, product.product_id, numberStar, content))
            } else {
                setInvalidStar(true)
            }
        } else {
            dispatch({ type: SHOW_FORM_LOGIN })
        }
    }

    useEffect(() => {
        setInvalidStar(false)
    }, [numberStar])

    const handleChangeContent = (e) => {
        dispatch({
            type: UPDATE_CONTENT,
            payload: {
                content: e.target.value
            }
        })
    }

    useEffect(() => {
        if (infoUser && product) {
            dispatch(getListFBPublic(infoUser.id, product.product_id))
        }
    }, [dispatch, infoUser, product])
    return (
        <>
            {
                infoUser && infoUser.id ?
                    <div>
                        <h4>{lang === "en" ? "Let rate" : "Đánh giá"}</h4>
                        {
                            listFeedBack && listFeedBack.length > 0 &&
                            <div className="form-rate" style={{ height: "267px" }}>
                                <StarFeedback key="abc" number_star={numberStar} type="PUBLIC"></StarFeedback>
                                {invalidStar && <p style={{ color: 'red' }}>{lang === "en" ? "*Please rate it with stars" : "*Bạn vui lòng đánh giá sao"}</p>}
                                <textarea value={content ? content : ''} label="Đánh giá" onChange={(e) => handleChangeContent(e)}></textarea>
                                <Button
                                    type="primary" shape="round" size="large"
                                    onClick={() => onClickSend()}
                                >

                                    {lang === "en" ? "Send" : "Gửi đánh giá"}
                                </Button>
                            </div>
                        }
                        {
                            listFeedBack && listFeedBack.length > 0 ?
                                listFeedBack.map(item => {
                                    return (
                                        <div className="item-feedback" key={item._id}>
                                            <p className="name-cus">
                                                {
                                                    item.cusInfo[0].username === infoUser.username
                                                        ?
                                                        <>
                                                            <AiFillHeart style={{ color: '#ee4b4b' }} className="avatar-feedback" />
                                                            <span style={{ color: 'red' }}>YOU</span>
                                                        </>
                                                        :
                                                        <>
                                                            <FaUserCircle className="avatar-feedback" />
                                                            <span >{item.cusInfo[0].username}</span>
                                                        </>
                                                }
                                            </p>
                                            <StarFeedback key="abc" number_star={item.number_star} type="PUBLIC"></StarFeedback>
                                            <p>{item.content}</p>
                                        </div>
                                    )
                                })
                                :
                                <>
                                    <p>{lang === "en" ? "There are no reviews yet" : "Chưa có đánh giá nào"}</p>

                                    <div className="form-rate">
                                        <h4>{lang === "en" ? "Be the first to comment" : "Hãy là người đầu tiên nhận xét"}</h4>
                                        <StarFeedback key="abc" number_star={numberStar} type="PUBLIC"></StarFeedback>
                                        {invalidStar && <p style={{ color: 'red' }}>{lang === "en" ? "*Please rate it with stars" : "*Bạn vui lòng đánh giá sao"}</p>}
                                        <textarea value={content ? content : ''} label="Đánh giá" onChange={(e) => handleChangeContent(e)}></textarea>
                                        <Button
                                            type="primary" shape="round" size="large"
                                            onClick={() => onClickSend()}
                                        >
                                            {lang === "en" ? "Send" : "Gửi đánh giá"}
                                        </Button>
                                    </div>
                                </>
                        }

                    </div>
                    :
                    <p>{lang === "en" ? "Login to see reviews" : "Đăng nhập để xem đánh giá"}</p>
            }


        </>
    )
}

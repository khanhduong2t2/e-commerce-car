import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_FAST_ANS, REMOVE_FAST_ANS } from '../../Redux/Constants/FeedbackConstant';
import { textLanguage } from '../../util/text_language';

export default function FastAns(props) {
    const dispatch = useDispatch();

    const { listAns } = props;

    const listSad = ["Giao hàng chậm", "Chất lượng sản phẩm tệ", "Thái độ làm việc tệ"]
    const listSad2 = [
        {
            vi: "Giao hàng chậm",
            en: "Slow delivery"
        },
        {
            vi: "Chất lượng sản phẩm tệ",
            en: "Product quality is bad"
        },
        {
            vi: "Thái độ làm việc tệ",
            en: "Bad work attitude"
        }
    ]
    const listMeh = ["Tốc độ giao hàng", "Chất lượng sản phẩm", "Thái độ làm việc"]
    const listMeh2 = [
        {
            vi: "Tốc độ giao hàng",
            en: "Delivery speed"
        },
        {
            vi: "Chất lượng sản phẩm",
            en: "Product quality"
        },
        {
            vi: "Thái độ làm việc",
            en: "Work attitude"
        }
    ]
    const listHappy = ["Giao hàng nhanh", "Chất lượng sản phẩm tốt", "Thái độ làm việc tốt"]
    const listHappy2 = [
        {
            vi: "Giao hàng nhanh",
            en: "Fast delivery"
        },
        {
            vi: "Chất lượng sản phẩm tốt",
            en: "Product quality is good"
        },
        {
            vi: "Thái độ làm việc tốt",
            en: "Good work attitude"
        }
    ]

    const language = useSelector((state) => state.language);
    let { lang } = language;
    let content = lang === "en" ? textLanguage.EN : textLanguage.VI;

    const FBPrivate = useSelector(state => state.FBPrivate);
    const { type_feel } = FBPrivate;

    const handleClickAns = (e) => {
        const isActive = e.target.classList.contains('active');
        if (isActive) {
            e.target.classList.remove('active');
            dispatch({
                type: REMOVE_FAST_ANS,
                payload: {
                    ans: e.target.innerText
                }
            })
        } else {
            e.target.classList.add('active');
            dispatch({
                type: ADD_FAST_ANS,
                payload: {
                    ans: e.target.innerText
                }
            })
        }
    }
    return (
        <>
            {
                listAns && listAns.length > 0 &&
                <div className="fast-ans">
                    {listAns && listAns.map((item, index) => {
                        return (
                            <p key={index} className="item-ans active"
                            >
                                {item}
                            </p>
                        )
                    })}
                </div>
            }
            {
                type_feel === "sad" &&
                <div className="fast-ans">
                    {listSad && listSad.map((item, index) => {
                        return (
                            <p key={index} className="item-ans"
                                onClick={(e) => handleClickAns(e)}
                            >
                                {item}
                            </p>
                        )
                    })}
                </div>
            }
            {
                type_feel === "meh" && <>
                    <p>Chúng tôi cần cải thiện ?</p>
                    <div className="fast-ans">
                        {listMeh && listMeh.map((item, index) => {
                            return (
                                <p key={index} className="item-ans"
                                    onClick={(e) => handleClickAns(e)}
                                >
                                    {item}
                                </p>
                            )
                        })}
                    </div>
                </>
            }
            {
                type_feel === "happy" &&
                <div className="fast-ans">
                    {listHappy && listHappy.map((item, index) => {
                        return (
                            <p key={index} className="item-ans"
                                onClick={(e) => handleClickAns(e)}
                            >
                                {item}
                            </p>
                        )
                    })}
                </div>
            }
        </>
    )
}

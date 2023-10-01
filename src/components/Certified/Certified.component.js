import React, { useEffect, useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { getListCertified } from '../../Redux/Actions/CertifiedActions'
export default function CertifiedComponent() {
    const dispatch = useDispatch();

    let [numShow, setNumShow] = useState(4);
    let [showIconDown, setShowIconDown] = useState(true);

    const certified = useSelector(state => state.certified);
    let { listCertified } = certified;

    useEffect(() => {
        window.scrollTo(0, 0);

        let lang = "vi";
        dispatch(getListCertified(lang))
    }, [dispatch])

    const handleClickIconDown = () => {
        setNumShow(100);
        setShowIconDown(false)
    }

    return (
        <div id="container-certified">
            <div className="service-plus">
                <h4>Dịch Vụ Hỗ Trợ 24h</h4>
                <p>
                    Dịch vụ hỗ trợ 24h giúp bạn an tâm lái xe mà không lo lắng về những bất trắc trên đường.
                    Bất cứ khi nào bạn và xe gặp tình huống hy hữu không mong đợi, hãy gọi ngay cho E-Car để được
                </p>
                <ul>
                    <li>Hỗ trợ kỹ thuật ngay tại nơi xảy ra sự cố</li>
                    <li>Miễn phí kéo xe về xưởng dịch vụ chính hãng hoặc địa điểm sửa chữa trong bán kính 15km</li>
                    <li>Sắp xếp phương tiện thay thế cho khách hàng di chuyển</li>
                    <li>Hỗ trợ 10l nhiên liệu (2 lần/năm)</li>
                    <li>Hỗ trợ giao chìa khóa dự phòng trong bán kính 15km</li>
                </ul>
                <p>
                    Tất cả khách hàng sở hữu xe E-Car từ 2/7/2023 được tận hưởng những tiện ích này trong vòng 3 năm
                    (tính từ ngày xuất hóa đơn) không giới hạn số lần yêu cầu dịch vụ.
                </p>
            </div>
            <div className="certified">
                <div className="title-certified">
                    <h1>E-Car Certified</h1>
                </div>
                <div className="list-certified">
                    {
                        listCertified && listCertified.length > 0 &&
                        listCertified.map((item, index) => {
                            return (
                                index + 1 < numShow && (
                                    (index + 1) % 2 === 0 ?
                                        <div className="item-certified" key={index}>
                                            <div className="content">
                                                <p className="title">#{index + 1} {item.title}</p>
                                                <p>{item.content}</p>
                                            </div>
                                            <img width="150px" height="150px" src={item.image} alt="img_item" />
                                        </div>
                                        : <div className="item-certified" key={index}>
                                            <img width="150px" height="150px" src={item.image} alt="img_item" />
                                            <div className="content">
                                                <p className="title">#{index + 1} {item.title}</p>
                                                <p>{item.content}</p>
                                            </div>
                                        </div>
                                )
                            )
                        })
                    }

                    {
                        showIconDown && <FaChevronDown className="iconDown" onClick={() => handleClickIconDown()} />
                    }

                </div>
            </div>
            <div className="video">
                <iframe width="400" height="215" src="https://www.youtube.com/embed/pjH6d3VAKNk?si=9VaCwE761OZmaSLj" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        </div>
    )
}

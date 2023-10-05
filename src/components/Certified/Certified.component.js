import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { FaChevronDown } from "react-icons/fa";
import { textLanguage } from '../../util/text_language';
import { getListCertified } from '../../Redux/Actions/CertifiedActions'
export default function CertifiedComponent() {
    const dispatch = useDispatch();

    let [numShow, setNumShow] = useState(4);
    let [showIconDown, setShowIconDown] = useState(true);

    const language = useSelector(state => state.language);
    let { lang } = language;
    const certified = useSelector(state => state.certified);
    let { listCertified } = certified;

    let content = lang === "en" ? textLanguage.EN : textLanguage.VI;

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
                <h4>{content.title_service_24h}</h4>
                <p>
                    {content.content_24h1}
                </p>
                <ul>
                    <li>{content.content_24h2}</li>
                    <li>{content.content_24h3}</li>
                    <li>{content.content_24h4}</li>
                    <li>{content.content_24h5}</li>
                    <li>{content.content_24h6}</li>
                </ul>
                <p>
                    {content.content_24h7}
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
                                                <p className="title">#{index + 1} {lang === "en" ? item.title_en : item.title}</p>
                                                <p>{lang === "en" ? item.content_en : item.content}</p>
                                            </div>
                                            <img width="150px" height="150px" src={item.image} alt="img_item" />
                                        </div>
                                        : <div className="item-certified" key={index}>
                                            <img width="150px" height="150px" src={item.image} alt="img_item" />
                                            <div className="content">
                                                <p className="title">#{index + 1} {lang === "en" ? item.title_en : item.title}</p>
                                                <p>{lang === "en" ? item.content_en : item.content}</p>
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
                <iframe width="100%" src="https://www.youtube.com/embed/pjH6d3VAKNk?si=9VaCwE761OZmaSLj" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        </div>
    )
}

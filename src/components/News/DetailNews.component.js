import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailNews } from '../../Redux/Actions/NewsActions';

export default function DetailNews() {
    const dispatch = useDispatch();
    let { id } = useParams();

    const language = useSelector(state => state.language);
    let { lang } = language;
    const detailNews = useSelector(state => state.detailNews);
    let { detail } = detailNews;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!detail || (detail && detail._id !== id)) {
            let lang = "vi";
            dispatch(getDetailNews(lang, id));
        }
    }, [dispatch, detail, id])

    return (
        <div id="container-detail-news">
            <div className="content">
                {
                    detail && detail.title && detail.title_en &&
                    <h1>{lang === "en" ? detail.title_en : detail.title}</h1>
                }
                {
                    detail && detail.list_images && detail.list_images.length > 0 &&
                    <img width="100%" src={detail.list_images[0]} alt="img_news" />
                }
                {
                    detail && detail.list_contents && detail.list_contents.length > 0 &&
                    (
                        lang === "en" ?
                            detail.list_contents_en.map((item, index) => {
                                return (
                                    <div className="item-content" key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                )
                            })
                            :
                            detail.list_contents.map((item, index) => {
                                return (
                                    <div className="item-content" key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                )
                            })
                    )
                }
            </div>
            {
                detail && detail.list_videos && detail.list_videos.length > 0 &&
                <div className="video">
                    {
                        detail.list_videos.map((item, index) => {
                            const html = `<iframe width="100%" height="100%" src=${item} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>`
                            return (
                                <div className="item-video" key={index} dangerouslySetInnerHTML={{ __html: html }} />
                            )
                        })
                    }
                </div>
            }

        </div >
    )
}

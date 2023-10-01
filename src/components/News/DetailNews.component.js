import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailNews } from '../../Redux/Actions/NewsActions';

export default function DetailNews() {
    const dispatch = useDispatch();
    let { id } = useParams();
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
            {
                detail && detail.title &&
                <h1>{detail.title}</h1>
            }

            {
                detail && detail.list_videos && detail.list_videos.length > 0 &&
                detail.list_videos.map((item, index) => {
                    const html = `<iframe width="400" height="220" src=${item} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>`
                    return (
                        <div key={index} dangerouslySetInnerHTML={{ __html: html }} />
                    )
                })
            }
            {
                detail && detail.list_contents && detail.list_contents.length > 0 &&
                detail.list_contents.map((item, index) => {
                    return (
                        <div className="item-content" key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    )
                })
            }
        </div>
    )
}

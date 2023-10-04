import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListNews } from '../../Redux/Actions/NewsActions'
import { NavLink } from 'react-router-dom';
export default function News() {
    const dispatch = useDispatch();

    const news = useSelector(state => state.news);
    let { isLoading, listNews } = news;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!listNews) {
            let lang = "vi";
            dispatch(getListNews(lang));
        }
    }, [dispatch, listNews]);

    return (
        <div id="container-news">
            {
                isLoading ? <Spinner animation="border" variant="primary" />
                    :
                    (listNews && listNews.length > 0 &&
                        <>
                            <div className="news-list-main">
                                <ul>
                                    {
                                        listNews.map(item => {
                                            return (
                                                <li key={item._id}>
                                                    {
                                                        (item.list_videos && item.list_videos[0]) ?
                                                            <iframe width="45%" src={item.list_videos[0]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                            : (item.list_images && item.list_images[0] ?
                                                                <img width="45%" src={item.list_images[0]} alt="img_news"></img>
                                                                : null)
                                                    }

                                                    <div className="container-content">
                                                        <NavLink to={"/detail-news/" + item._id} activeclassname="active">
                                                            <p className="title">{item.title}</p>
                                                            <p className="content">{item.description}</p>
                                                        </NavLink>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="news-list-sup">
                                <h4>Bài viết mới</h4>
                                <ul>
                                    {
                                        listNews && listNews.length > 0 &&
                                        listNews.map(item => {
                                            return (
                                                item.status === "new" ?
                                                    <li key={item._id}>
                                                        <NavLink to={"/detail-news/" + item._id} activeclassname="active">
                                                            {item.title}
                                                        </NavLink>
                                                    </li>
                                                    : null
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

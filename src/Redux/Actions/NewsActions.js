import axios from 'axios';
import { listAPIs } from './API/ListAPIs';
import {
    GET_DETAIL_NEWS_FAIL, GET_DETAIL_NEWS_REQUEST, GET_DETAIL_NEWS_SUCCESS,
    GET_LIST_NEWS_FAIL, GET_LIST_NEWS_REQUEST, GET_LIST_NEWS_SUCCESS
} from '../Constants/NewsConstants';

export const getListNews = (lang) => async (dispatch) => {
    try {
        dispatch({ type: GET_LIST_NEWS_REQUEST });


        const config = {
            headers: {
                "Content-Type": "application/json",
                "lang": lang
            }
        }

        let { data } = await axios.get(listAPIs.GET_LIST_NEWS, config);
        if (data.status && data.data) {
            dispatch({
                type: GET_LIST_NEWS_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: GET_LIST_NEWS_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: GET_LIST_NEWS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}


export const getDetailNews = (lang, id) => async (dispatch) => {
    try {
        dispatch({ type: GET_DETAIL_NEWS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                "lang": lang
            }
        }
        console.log('id: ', id)
        let { data } = await axios.get(listAPIs.GET_DETAIL_NEWS + `/${id}`, config);
        if (data.status && data.data) {
            dispatch({
                type: GET_DETAIL_NEWS_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: GET_DETAIL_NEWS_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: GET_DETAIL_NEWS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
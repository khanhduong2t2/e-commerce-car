import { GET_DETAIL_NEWS_FAIL, GET_DETAIL_NEWS_REQUEST, GET_DETAIL_NEWS_SUCCESS, GET_LIST_NEWS_FAIL, GET_LIST_NEWS_REQUEST, GET_LIST_NEWS_SUCCESS } from "../Constants/NewsConstants"

export const ListNewsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_LIST_NEWS_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case GET_LIST_NEWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listNews: action.payload,
            }
        case GET_LIST_NEWS_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        default:
            return state
    }
}

export const DetailNewsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DETAIL_NEWS_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case GET_DETAIL_NEWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                detail: action.payload,
            }
        case GET_DETAIL_NEWS_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        default:
            return state
    }
}
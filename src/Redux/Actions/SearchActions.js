import axios from "axios";
import { listAPIs } from "./API/ListAPIs";
import { SEARCH_PRODUCT_FAIL, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS } from "../Constants/SearchConstants";

export const searchProduct = (key_search) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_PRODUCT_REQUEST })

        let encodeKeySearch = encodeURIComponent(key_search)
        const { data } = await axios.get(`${listAPIs.SEARCH_PRODUCT}${encodeKeySearch}`)

        if (data.status && data.data) {
            dispatch({
                type: SEARCH_PRODUCT_SUCCESS,
                payload: data.data
            })
        }
    } catch (error) {
        dispatch({
            type: SEARCH_PRODUCT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}